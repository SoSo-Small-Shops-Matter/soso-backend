import { ConflictException, Injectable } from '@nestjs/common';
import { SubmitRepository } from './submit.repository';

@Injectable()
export class SubmitService {
    constructor(private submitRepository:SubmitRepository){}
    
    async findAllShop(){
        return await this.submitRepository.findAllShop();
    }

    async createNewShop(newShop){
        const { shop, operatingHours, products } = newShop;
        const createShop =  await this.submitRepository.createNewShop(shop);
        if(createShop){
            throw new ConflictException();
        }
        if(operatingHours){
            await this.submitRepository.saveOperatingByShopId(operatingHours,createShop.id);
        }
        if(products){
            const productMappings = products.map((product) => ({
                submitShop: { id: createShop.id },
                submitProduct: { id: product.id },
            }));
            await this.submitRepository.saveProductsByShopId(productMappings);
        }
        return;
    }

    async validateAndUpdateOperatingHours(operatingData,shopId){
        return await this.submitRepository.validateAndUpdateOperatingHours(operatingData,shopId);
    }

    async findValidateOperatingHours(){
        return await this.submitRepository.findValidateOperatingHours();
    }
}
