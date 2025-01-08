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
            // 모든 Shop 엔터티를 가져옵니다.
            const shops = await this.shopRepository.find();
            // 각 Shop의 관계 데이터를 비동기로 로드합니다.
            const enrichedShops = await Promise.all(
                shops.map(async (shop) => {
                    const operatingHours = await shop.operatingHours; // Lazy Loading
                    const products = await shop.products; // Lazy Loading
                    return {         
                        id: shop.id,
                        name: shop.name,
                        reportStatus: shop.reportStatus,
                        lat: shop.lat,
                        lng: shop.lng,
                        location: shop.location, 
                        operatingHours, 
                        products 
                    };
                })
            );
            return enrichedShops;
        }catch(err){
            console.error("Shop/findAllShop Error", err); // 에러 로그 추가
            throw new InternalServerErrorException();
        }
    }

    async findShopByShopId(shopId:number){
        try{
            // 모든 Shop 엔터티를 가져옵니다. 
            let shop = await this.shopRepository.findOne({where:{id:shopId}});
            if(!shop){
                return null;
            }
            const operatingHours = await shop.operatingHours; // Lazy Loading
            const products = await shop.products; // Lazy Loading

            return {
                id: shop.id,
                name: shop.name,
                reportStatus: shop.reportStatus,
                lat: shop.lat,
                lng: shop.lng,
                location: shop.location,
                operatingHours,
                products,
            };
        }catch(err){
            console.error("Shop/findShopByShopId Error", err); // 에러 로그 추가
            throw new InternalServerErrorException();
        }
    }

    async updateShopProduct(productData:any,shopId:number){
        try{
            const shop = await this.shopRepository.findOne({ where: { id: shopId }, relations: ['products'] });

            const productMappings = productData.map((product) => ({
                id: product.id ,
            }));
            
            shop.products = productMappings;

            await this.shopRepository.save(shop);
            return shop;
        }catch(err){
            console.error("Shop/updateShopProduct Error",err);
            throw new InternalServerErrorException();
        }
    }
}
