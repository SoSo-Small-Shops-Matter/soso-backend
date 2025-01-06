import { Injectable } from '@nestjs/common';
import { SubmitRepository } from './submit.repository';

@Injectable()
export class SubmitService {
    constructor(private submitRepository:SubmitRepository){}
    
    async findAllShop(){
        return await this.submitRepository.findAllShop();
    }

    async createNewShop(newShop){
        const { shop, operatingHours, products } = newShop;
        return await this.submitRepository.createNewShop(shop, operatingHours, products);
    }
}
