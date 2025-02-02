import { Injectable } from '@nestjs/common';
import { ShopRepository } from '../shop/shop.repository';
import { OperateRepository } from '../operate/operate.repository';

@Injectable()
export class AdminService {
    constructor(
        private shopRepository: ShopRepository,
        private operateRepository: OperateRepository,
    ){}

    async findReportedShops(){
        return await this.shopRepository.findReportedAllShops();
    }

    async findSubmitedShops(){
        const newShop = await this.shopRepository.findSubmitedAllShops();
        const newOperatingInfo = await this.operateRepository.findSubmitedAllOperatings();
        return {
            newShop,
            newOperatingInfo,
        }
    }
}
