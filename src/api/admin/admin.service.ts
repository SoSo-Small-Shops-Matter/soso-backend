import { Injectable } from '@nestjs/common';
import { ShopRepository } from '../shop/shop.repository';
import { SubmitRepository } from '../submit/submit.repository';

@Injectable()
export class AdminService {
    constructor(
        private shopRepository: ShopRepository,
        private submitUserRecordRepository: SubmitRepository,

    ){}

    async findReportedShops(report:number){
        return await this.shopRepository.findReportedShops(report);
    }

    async findSubmitShops(type: number){
        return await this.submitUserRecordRepository.findSubmitUserRecord(type);
    }
}
