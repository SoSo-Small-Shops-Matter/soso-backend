import { Injectable } from '@nestjs/common';
import { ShopRepository } from './shop.repository';

@Injectable()
export class ShopService {
    constructor(private shopRepository:ShopRepository){}

    async findAllShop(){
        return await this.shopRepository.findAllShop();
    }
}
