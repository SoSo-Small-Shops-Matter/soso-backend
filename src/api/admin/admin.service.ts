import { Injectable } from '@nestjs/common';
import { ShopRepository } from '../shop/shop.repository';

@Injectable()
export class AdminService {
    constructor(
        private shopRepository: ShopRepository,

    ){}

    async findReportedShops(report:number){
        return await this.shopRepository.findReportedShops(report);
    }
}
