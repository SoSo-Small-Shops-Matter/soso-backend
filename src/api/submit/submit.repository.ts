import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmitOperatingHours } from 'src/database/entity/submit-operating-hours.entity';
import { SubmitProductMapping } from 'src/database/entity/submit-product_mapping.entity';
import { SubmitShop } from 'src/database/entity/submit-shop.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SubmitRepository extends Repository<SubmitShop> {
    constructor(
        private dataSource: DataSource,
        @InjectRepository(SubmitProductMapping)
        private submitProductMappingRepository: Repository<SubmitProductMapping>, // ProductRepository 주입
        @InjectRepository(SubmitOperatingHours)
        private submitOperatingRepository: Repository<SubmitOperatingHours>, // OperatingHoursRepository 주입
    
    ) {
        super(SubmitShop, dataSource.createEntityManager());
    }

    async findAllShop() {
        try{
            // 모든 Shop 엔터티를 가져옵니다.
            const shops = await this.find();
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
            const shop = await this.save(shopData);
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
}
