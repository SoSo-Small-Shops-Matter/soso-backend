import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from 'src/database/entity/shop.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ShopRepository {
    constructor(
        @InjectRepository(Shop)
        private shopRepository:Repository<Shop>
    ) {}

    async findAllShop() {
        try{
            return await this.shopRepository.find({ relations: ['operatingHours','products']});
        }catch(err){
            console.error("Shop/findAllShop Error", err); // 에러 로그 추가
            throw new InternalServerErrorException();
        }
    }
    
    async findShopByShopId(shopId:number){
        try{
            return await this.shopRepository.findOne({
                where:{id:shopId},
                relations:['operatingHours','products'],
            });
        }catch(err){
            console.error("Shop/findShopByShopId Error", err); // 에러 로그 추가
            throw new InternalServerErrorException();
        }
    }

    async saveShopProduct(shop:any){
        try{
            await this.shopRepository.save(shop);
            return shop;
        }catch(err){
            console.error("Shop/saveShopProduct Error",err);
            throw new InternalServerErrorException();
        }
    }
}
