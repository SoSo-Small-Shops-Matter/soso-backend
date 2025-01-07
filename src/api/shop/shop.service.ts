import { Injectable, NotFoundException } from '@nestjs/common';
import { ShopRepository } from './shop.repository';

@Injectable()
export class ShopService {
    constructor(private shopRepository:ShopRepository){}

    async findAllShop(){
        return await this.shopRepository.findAllShop();
    }

    async findShopByShopId(shopId: number){
        const result = await this.shopRepository.findShopByShopId(shopId);
        if(!result){
            throw new NotFoundException('NOT_FOUND_SHOP');
        }
    }

    async updateShopProduct(productData,shopId){
        return await this.shopRepository.updateShopProduct(productData,shopId);
    }
}
