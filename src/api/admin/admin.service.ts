import { Injectable } from '@nestjs/common';
import { ShopRepository } from '../shop/shop.repository';
import { SubmitRepository } from '../submit/submit.repository';

@Injectable()
export class AdminService {
    constructor(
        private shopRepository: ShopRepository,
        private submitRepository:SubmitRepository,
    ){}

    async findReportedShops(){
        return await this.shopRepository.findReportedAllShops();
    }

    async findSubmitedShops(){
        const newShop = await this.submitRepository.findSubmitedAllShops();
        const newOperatingInfo = await this.submitRepository.findSubmitedAllOperatings();
        return {
            newShop,
            newOperatingInfo,
        }
    }
}
