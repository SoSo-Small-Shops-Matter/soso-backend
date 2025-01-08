import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmitOperatingHours } from 'src/database/entity/submit-operating-hours.entity';
import { SubmitProductMapping } from 'src/database/entity/submit-product_mapping.entity';
import { SubmitShop } from 'src/database/entity/submit-shop.entity';
import { DataSource, MoreThan, Repository } from 'typeorm';

@Injectable()
export class SubmitRepository{
    constructor(
        @InjectRepository(SubmitShop)
        private submitShopRepository: Repository<SubmitShop>, // ProductRepository 주입
        @InjectRepository(SubmitProductMapping)
        private submitProductMappingRepository: Repository<SubmitProductMapping>, // ProductRepository 주입
        @InjectRepository(SubmitOperatingHours)
        private submitOperatingRepository: Repository<SubmitOperatingHours>, // OperatingHoursRepository 주입
    
    ) {}

    async findAllShop() {
        try{
            // 모든 Shop 엔터티를 가져옵니다.
            const shops = await this.submitShopRepository.find();
            // 각 Shop의 관계 데이터를 비동기로 로드합니다.
            const enrichedShops = await Promise.all(
                shops.map(async (shop) => {
                    const operatingHours = await shop.submitOperatingHours; // Lazy Loading
                    const products = await shop.submitProducts; // Lazy Loading
                    return {         
                        id: shop.id,
                        name: shop.name,
                        reportStatus: shop.reportStatus,
                        lat: shop.lat,
                        lng: shop.lng,
                        location: shop.location, 
                        operatingHours, 
                        products 
                    };
                })
            );
            return enrichedShops;
        }catch(err){
            console.error("Shop/findAllShop Error", err); // 에러 로그 추가
            throw new InternalServerErrorException();
        }
    }

    async createNewShop(shopData,operatingData,productData){
        try{
            const shop = await this.submitShopRepository.save(shopData);
            const shopId = shop.id;
            
            if(operatingData){
                await this.submitOperatingRepository.save({
                    submitShop: { id: shopId },
                    ...operatingData,
                })
            }
            
            if(productData){
                const productMappings = productData.map((product) => ({
                    submitShop: { id: shopId },
                    submitProduct: { id: product.id },
                }));
                
                await this.submitProductMappingRepository.save(productMappings);
            }
        
        }catch(err){
            console.error("SubmitShop/createNewShop Error", err); // 에러 로그 추가
            throw new InternalServerErrorException();
        }
    }

    async validateAndUpdateOperatingHours(operatingData,shopId){
        try{
            // 이건 이미 올려져 있는 소품샵의 운영 정보시간이 확인 후 업데이트 될 예정이라 shopId에 이미 올려져 있는 소품샵 ID가 들어가있음 하지만 이걸 그대로 쓰면 submitShop의 id와 충돌이 날 수 있음
            // 따라서 기존 shopId 에 + 10,000을 해줌  -> util에 상수로 만들기 
            return await this.submitOperatingRepository.save({
                submitShop: { id: shopId + 10000},
                ...operatingData,
            });
        }catch(err){
            console.error("SubmitShop/validateAndUpdateOperatingHours Error", err);
            throw new InternalServerErrorException();
        }
    }

    async findValidateOperatingHours(){
        try{
            const shops = await this.submitShopRepository.find({
                where: {
                    id: MoreThan(10000),
                },
                relations: ['submitOperatingHours'],
            });
            return shops;
        }catch(err){
            console.error("SubmitShop/findValidateOperatingHours Error", err);
            throw new InternalServerErrorException();
        }
    }
}
