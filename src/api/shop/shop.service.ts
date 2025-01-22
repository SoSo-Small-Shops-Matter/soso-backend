import { Injectable, NotFoundException } from '@nestjs/common';
import { ShopRepository } from './shop.repository';
import { UpdateShopProductsDto } from './dto/submit.dto';
import { Product } from 'src/database/entity/product.entity';

@Injectable()
export class ShopService {
    constructor(private shopRepository:ShopRepository){}

    async findShopsWithin1Km(lat: number, lng: number){
        const radius = 6371; // 지구 반경 (km)
        const distanceLimit = 1; // 거리 제한 (1km)

        return await this.shopRepository.findShopsWithin1Km(lat, lng, distanceLimit, radius);
    }

    async findShopByShopId(shopId: number){
        const shop = await this.shopRepository.findShopByShopId(shopId);
        if(!shop){
            throw new NotFoundException('NOT_FOUND_SHOP');
        }
        // shop.reviews createdAt순으로 sorting 필요 및 필요하면 userReview와 otherReivew 구분 
        return shop;
    }

    async findShopsWithin1KmAndSortByReviewCount(lat: number, lng: number) {
        const radius = 6371; // 지구 반경 (km)
        const distanceLimit = 1; // 거리 제한 (1km)
        const { raw } = await this.shopRepository.findShopsWithin1KmAndSortByReviewCount(lat, lng, distanceLimit, radius);
        return raw;
    }

    async updateShopProduct(updateShopProductsDto:UpdateShopProductsDto){
        const { shopId, products } = updateShopProductsDto;
        const shop =  await this.shopRepository.findShopByShopId(shopId);
        if(!shop){
            throw new NotFoundException('NOT_FOUND_SHOP');
        }

        const productMappings = products.map((mapping) => {
            const product = new Product(); 
            product.id = mapping.id;
            return product;
        });
        
        shop.products = productMappings;

        return await this.shopRepository.saveShopProduct(shop);
    }
}
