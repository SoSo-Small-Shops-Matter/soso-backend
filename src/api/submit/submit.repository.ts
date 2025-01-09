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
            return await this.submitShopRepository.find({relations:['submitOperatingHours','submitProducts']});
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

    async createNewShopForUpdateOperatingHours(shopId:number){
        try{
            return await this.submitShopRepository.save({
                id:shopId + 10000,
            });  
        }catch(err){
            console.error("SubmitShop/createNewShop Error", err); // 에러 로그 추가
            throw new InternalServerErrorException();
        }
    }

    async validateAndUpdateOperatingHours(shopId:number,operatingData:OperatingHours){
        try{
            // 이건 이미 올려져 있는 소품샵의 운영 정보시간이 확인 후 업데이트 될 예정이라 shopId에 이미 올려져 있는 소품샵 ID가 들어가있음 하지만 이걸 그대로 쓰면 submitShop의 id와 충돌이 날 수 있음
            // 따라서 기존 shopId 에 + 10,000을 해줌  -> util에 상수로 만들기 
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
                    id: MoreThan(10000),
                },
                relations: ['submitOperatingHours'],
            });
        }catch(err){
            console.error("SubmitShop/findValidateOperatingHours Error", err);
            throw new InternalServerErrorException();
        }
    }
}
