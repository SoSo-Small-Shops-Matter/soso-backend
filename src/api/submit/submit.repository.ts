import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from 'src/database/entity/region.entity';
import { SubmitUserRecord } from 'src/database/entity/submit-user.entity';
import { Shop } from 'src/database/entity/shop.entity';
import { ProductMapping } from 'src/database/entity/product_mapping.entity';
import { OperatingHours } from 'src/database/entity/operating-hours.entity';

@Injectable()
export class SubmitRepository{
    constructor(
        @InjectRepository(Shop)
        private submitShopRepository: Repository<Shop>, // ProductRepository 주입
        @InjectRepository(ProductMapping)
        private submitProductMappingRepository: Repository<ProductMapping>, // ProductRepository 주입
        @InjectRepository(OperatingHours)
        private submitOperatingRepository: Repository<OperatingHours>, // OperatingHoursRepository 주입
        @InjectRepository(Region)
        private regionRepository: Repository<Region>,
        @InjectRepository(SubmitUserRecord)
        private submitUserRecordRepository: Repository<SubmitUserRecord>,
    ) {}

    async saveOperatingByShopId(operatingData,shopId){
        try{
            return await this.submitOperatingRepository.save({
                shop: { id: shopId },
                type: 1,
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

    async createNewShop(shop, regionId: number) {
        try {
            return await this.submitShopRepository.save({
                ...shop,
                type: 1,
                region: {
                    id: regionId,
                }
            });           
        } catch (err) {
            console.error("SubmitShop/createNewShop Error", err); // 에러 로그 추가
            throw new InternalServerErrorException();
        }
    }
    

    async createNewShopForUpdateOperatingHours(name,lat,lng,location){
        try{
            return await this.submitShopRepository.save({
                name,
                type: 1,
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

    async validateAndUpdateOperatingHours(shopId:number,operatingData){
        try{
            return await this.submitOperatingRepository.save({
                shop: { id: shopId },
                type: 1,
                ...operatingData,
            });
        }catch(err){
            console.error("SubmitShop/validateAndUpdateOperatingHours Error", err);
            throw new InternalServerErrorException();
        }
    }

    async findRegionByLocation(location){
        try{
            const regionName = location[0] + location[1];
            return await this.regionRepository.findOne({
                where:{
                    name:regionName,
                }
            })
        }catch(err){
            console.error(err);
            throw new InternalServerErrorException();
        }
    }

    async createSubmitUserRecordByNewShop(uuid, shopId){
        try{
            return await this.submitUserRecordRepository.save({
                uuid,
                shopId,
                status: 0,
                type: 0,
                user: {
                    uuid,
                },
                shop: {
                    id: shopId,
                }
            })
        }catch(err){
            console.error(err);
            throw new InternalServerErrorException();
        }
    }

    async createSubmitUserRecordByUpdateOperatingInfo(uuid, shopId) {
        try{
            return await this.submitUserRecordRepository.save({
                uuid,
                shopId,
                status: 0,
                type: 1,
                user: {
                    uuid,
                },
                shop: {
                    id: shopId,
                }
            })
        }catch(err){
            console.error(err);
            throw new InternalServerErrorException();
        }
    }

    async createSubmitUserRecordByUpdateProducts(uuid: string, shopId: number) {
        try{
            return await this.submitUserRecordRepository.save({
                uuid,
                shopId,
                status: 1,
                type: 2,
                user: {
                    uuid,
                },
                shop: {
                    id: shopId,
                }
            })
        }catch(err){
            console.error(err);
            throw new InternalServerErrorException();
        }
    }
}
