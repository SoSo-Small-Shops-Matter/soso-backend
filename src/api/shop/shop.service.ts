import { Injectable, NotFoundException } from '@nestjs/common';
import { ShopRepository } from './shop.repository';
import { UpdateShopProductsDto } from './dto/submit.dto';
import { Product } from 'src/database/entity/product.entity';
import { ReviewService } from '../review/review.service';

@Injectable()
export class ShopService {
    constructor(
        private shopRepository:ShopRepository,
        private reviewService:ReviewService,
    ){}

    async findShopsWithin1Km(lat: number, lng: number){
        const radius = 6371; // 지구 반경 (km)
        const distanceLimit = 1; // 거리 제한 (1km)

        return await this.shopRepository.findShopsWithin1Km(lat, lng, distanceLimit, radius);
    }

    async findShopByShopId(shopId: number, uuid: string){
        const shop = await this.shopRepository.findShopByShopId(shopId);
        if(!shop){
            throw new NotFoundException('NOT_FOUND_SHOP');
        }
        const { userReviews, otherReviews } = await this.reviewService.findShopReviewsByShopId(shopId, uuid);

        return {
            shop,
            userReviews,
            otherReviews,
        };
    }

    async findShopsWithin1KmAndSortByReviewCountAndAllShop(lat: number, lng: number) {
        const radius = 6371; // 지구 반경 (km)
        const distanceLimit = 1; // 거리 제한 (1km)
        const { raw } = await this.shopRepository.findShopsWithin1KmAndSortByReviewCount(lat, lng, distanceLimit, radius);
        const allShop = await this.shopRepository.findAllShop();
        return {
            default: raw,
            all: allShop,
        }
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

    async updateShopReportStatus(report: number, shopId: number){
        return await this.shopRepository.updateShopReportStatusByShopId(report,shopId);
    }
}
