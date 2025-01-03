import { Injectable } from '@nestjs/common';
import { Shop } from 'src/database/entity/shop.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ShopRepository extends Repository<Shop> {
    constructor(private dataSource: DataSource) {
        super(Shop, dataSource.createEntityManager());
    }
    async findAllShop() {
        // 모든 Shop 엔터티를 가져옵니다.
        const shops = await this.find();
      
        // 각 Shop의 관계 데이터를 비동기로 로드합니다.
        const enrichedShops = await Promise.all(
          shops.map(async (shop) => {
            const operatingHours = await shop.operatingHours; // Lazy Loading
            const products = await shop.products; // Lazy Loading
            return { ...shop, operatingHours, products };
          })
        );
        return enrichedShops;
      }
      
}
