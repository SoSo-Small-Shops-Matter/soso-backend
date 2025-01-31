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
                shop: { id: createShop.id },
                product: { id: product.id },
            }));
            await this.submitRepository.saveProductsByShopId(productMappings);
        }

        const result = await this.submitRepository.createSubmitUserRecordByNewShop(uuid,createShop.id);

        return result;
    }

    async validateAndUpdateOperatingHours(operatingData:SubmitShopOperatingHoursDto, uuid:string){
        const { shopId, operatingHours } = operatingData;

        console.log(operatingHours);
        // 운영정보 업데이트시 해당 소품샵이 존재하는지 체크 
        const shop = await this.shopRepository.findOnlyShopByShopId(shopId);
        if(!shop){
            throw new ConflictException('없는 소풉샵입니다.');
        }
    
        await this.submitRepository.validateAndUpdateOperatingHours(shop.id,operatingHours);

        const result = await this.submitRepository.createSubmitUserRecordByUpdateOperatingInfo(uuid,shop.id);
        
        return result;
    }
}
