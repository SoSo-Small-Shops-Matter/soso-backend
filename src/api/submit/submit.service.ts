import { ConflictException, Injectable } from '@nestjs/common';
import { SubmitRepository } from './submit.repository';
import { SubmitNewShopDto, SubmitShopOperatingHoursDto } from './dto/submit.dto';
import { ShopRepository } from '../shop/shop.repository';

@Injectable()
export class SubmitService {
    constructor(
        private submitRepository:SubmitRepository,
        private shopRepository:ShopRepository,
    ){}
    
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
        const shop = await this.shopRepository.findOnlyShopByShopId(shopId);
        if(!shop){
            throw new ConflictException('없는 소풉샵입니다.');
        }
        
        const createShop =  await this.submitRepository.createNewShopForUpdateOperatingHours(shop.name,shop.lat,shop.lng,shop.location);
        if(!createShop){
            throw new ConflictException('소풉샵을 제포하는 도중 오류가 발생했습니다.');
        }
        return await this.submitRepository.validateAndUpdateOperatingHours(createShop.id,operatingHours);
    }

    async findValidateOperatingHours(){
        return await this.submitRepository.findValidateOperatingHours();
    }
}
