import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

    async createNewShop(newShopData:SubmitNewShopDto, uuid:string){
        const { shop, operatingHours, products } = newShopData;
        
        const region = await this.submitRepository.findRegionByLocation(shop.location);
        if(!region){
            throw new NotFoundException('위치가 잘못됐습니다.');
        }

        const createShop =  await this.submitRepository.createNewShop(shop,region.id);

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

        const result = await this.submitRepository.createSubmitUserRecordByNewShop(uuid,createShop.id);

        return result;
    }

    async validateAndUpdateOperatingHours(operatingData:SubmitShopOperatingHoursDto, uuid:string){
        const { shopId, operatingHours } = operatingData;
        const shop = await this.shopRepository.findOnlyShopByShopId(shopId);
        if(!shop){
            throw new ConflictException('없는 소풉샵입니다.');
        }
        
        const createShop =  await this.submitRepository.createNewShopForUpdateOperatingHours(shop.name,shop.lat,shop.lng,shop.location);
        if(!createShop){
            throw new ConflictException('소풉샵을 제포하는 도중 오류가 발생했습니다.');
        }

        await this.submitRepository.validateAndUpdateOperatingHours(createShop.id,operatingHours);

        const result = await this.submitRepository.createSubmitUserRecordByUpdateOperatingInfo(uuid,createShop.id);
        
        return result;
    }

    async findValidateOperatingHours(){
        return await this.submitRepository.findValidateOperatingHours();
    }
}
