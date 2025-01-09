import { Injectable, NotFoundException } from '@nestjs/common';
import { ShopRepository } from './shop.repository';

@Injectable()
export class ShopService {
    constructor(private shopRepository:ShopRepository){}

    async findAllShop(){
        return await this.shopRepository.findAllShop();
    }

    async findShopByShopId(shopId: number){
        const shop = await this.shopRepository.findShopByShopId(shopId);
        if(!shop){
            throw new NotFoundException('NOT_FOUND_SHOP');
        }
    }

    async updateShopProduct(productData,shopId){
        const shop =  await this.shopRepository.findShopByShopId(shopId);
        if(!shop){
            throw new NotFoundException('NOT_FOUND_SHOP');
        }

        const productMappings = productData.map((product) => ({
            id: product.id ,
        }));
        shop.products = productMappings;
        
        return await this.shopRepository.saveShopProduct(shop);
    }
}
