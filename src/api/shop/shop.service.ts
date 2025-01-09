import { Injectable, NotFoundException } from '@nestjs/common';
import { ShopRepository } from './shop.repository';
import { UpdateShopProductsDto } from './dto/submit.dto';
import { Product } from 'src/database/entity/product.entity';

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
