import { ConflictException, Injectable } from '@nestjs/common';
import { SubmitRepository } from './submit.repository';
import { SubmitNewShopDto, SubmitShopOperatingHoursDto } from './dto/submit.dto';

@Injectable()
export class SubmitService {
    constructor(private submitRepository:SubmitRepository){}
    
    async findAllShop(){
        return await this.submitRepository.findAllShop();
    }

    async createNewShop(newShopData:SubmitNewShopDto){
        const { shop, operatingHours, products } = newShopData;
        const createShop =  await this.submitRepository.createNewShop(shop);
        if(!createShop){
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

    async validateAndUpdateOperatingHours(operatingData:SubmitShopOperatingHoursDto){
        const { shopId, operatingHours } = operatingData;
        const createShop =  await this.submitRepository.createNewShopForUpdateOperatingHours(shopId);
        if(!createShop){
            throw new ConflictException();
        }
        return await this.submitRepository.validateAndUpdateOperatingHours(createShop.id,operatingHours);
    }

    async findValidateOperatingHours(){
        return await this.submitRepository.findValidateOperatingHours();
    }
}
