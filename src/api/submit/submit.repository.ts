import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmitOperatingHours } from 'src/database/entity/submit-operating-hours.entity';
import { SubmitProductMapping } from 'src/database/entity/submit-product_mapping.entity';
import { SubmitShop } from 'src/database/entity/submit-shop.entity';
import { MoreThan, Repository } from 'typeorm';
import { OperatingHours } from './dto/submit.dto';

@Injectable()
export class SubmitRepository{
    constructor(
        @InjectRepository(SubmitShop)
        private submitShopRepository: Repository<SubmitShop>, // ProductRepository 주입
        @InjectRepository(SubmitProductMapping)
        private submitProductMappingRepository: Repository<SubmitProductMapping>, // ProductRepository 주입
        @InjectRepository(SubmitOperatingHours)
        private submitOperatingRepository: Repository<SubmitOperatingHours>, // OperatingHoursRepository 주입
    
    ) {}

    async findAllShop() {
        try{
            return await this.submitShopRepository.find({
                where: {
                    existShop:false,
                },
                relations:['submitOperatingHours','submitProducts']
            });
        }catch(err){
            console.error("Shop/findAllShop Error", err); // 에러 로그 추가
            throw new InternalServerErrorException();
        }
    }
    async saveOperatingByShopId(operatingData,shopId){
        try{
            return await this.submitOperatingRepository.save({
                submitShop: { id: shopId },
                ...operatingData,
            })
        }catch(err){
            console.error("SubmitShop/saveOperatingByShopId Error", err);
            throw new InternalServerErrorException();
        }
    }
    async saveProductsByShopId(productMappings){
        try{
            return await this.submitProductMappingRepository.save(productMappings);
        }catch(err){
            console.error("SubmitShop/saveProductsByShopId Error", err);
            throw new InternalServerErrorException();
        }
    }
    async createNewShop(shop){
        try{
            return await this.submitShopRepository.save(shop);  
        }catch(err){
            console.error("SubmitShop/createNewShop Error", err); // 에러 로그 추가
            throw new InternalServerErrorException();
        }
    }

    async createNewShopForUpdateOperatingHours(name,lat,lng,location){
        try{
            return await this.submitShopRepository.save({
                name,
                lat,
                lng,
                location,
                existShop: true,
            });  
        }catch(err){
            console.error("SubmitShop/createNewShop Error", err); // 에러 로그 추가
            throw new InternalServerErrorException();
        }
    }

    async validateAndUpdateOperatingHours(shopId:number,operatingData:OperatingHours){
        try{
            return await this.submitOperatingRepository.save({
                submitShop: { id: shopId },
                ...operatingData,
            });
        }catch(err){
            console.error("SubmitShop/validateAndUpdateOperatingHours Error", err);
            throw new InternalServerErrorException();
        }
    }

    async findValidateOperatingHours(){
        try{
            return await this.submitShopRepository.find({
                where: {
                    existShop:true,
                },
                relations: ['submitOperatingHours'],
            });
        }catch(err){
            console.error("SubmitShop/findValidateOperatingHours Error", err);
            throw new InternalServerErrorException();
        }
    }
}
