import { InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from 'src/database/entity/shop.entity';
import { Repository } from 'typeorm';
import { LoggerService } from '../logger/logger.service';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProductMapping } from '../../database/entity/product_mapping.entity';

@Injectable()
export class ShopRepository extends Repository<Shop> {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    private readonly loggerService: LoggerService,
    private dataSource: DataSource
  ) {
    super(Shop, dataSource.createEntityManager());
  }

  async findShopsByKeyword(keyword: string, page: number, limit: number) {
    try {
      return await this.shopRepository
        .createQueryBuilder('shop')
        .where('shop.name LIKE :keyword', { keyword: `%${keyword}%` }) // 부분 검색
        .orWhere('shop.location LIKE :keyword', { keyword: `%${keyword}%` }) // 도로명 검색
        .andWhere('shop.type = :type', { type: 0 }) // 특정 타입 필터링
        .skip(limit * (page - 1)) // offset 계산
        .take(limit) // 한 페이지당 표시할 개수
        .getMany();
    } catch (err) {
      this.loggerService.warn(`Shop/ findShopsByKeyword Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async findAllShopsCountByKeyword(keyword: string) {
    try {
      return await this.shopRepository
        .createQueryBuilder('shop')
        .where('shop.name LIKE :keyword', { keyword: `%${keyword}%` }) // 부분 검색
        .orWhere('shop.location LIKE :keyword', { keyword: `%${keyword}%` }) // 도로명 검색
        .andWhere('shop.type = :type', { type: 0 }) // 특정 타입 필터링
        .getCount();
    } catch (err) {
      this.loggerService.warn(`Shop/ findAllShopsCountByKeyword Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async findOnlyShopByShopId(shopId: number) {
    try {
      return await this.shopRepository.findOne({
        where: {
          id: shopId,
          type: 0,
        },
      });
    } catch (err) {
      this.loggerService.warn(`Shop/ findOnlyShopByShopId Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async findShopByShopId(shopId: number) {
    try {
      return await this.shopRepository
        .createQueryBuilder('shop')
        .leftJoinAndSelect('shop.operatingHours', 'operatingHours', 'operatingHours.type = :operatingHoursType', { operatingHoursType: 0 }) // 운영 시간 필터링
        .leftJoinAndSelect('shop.productMappings', 'productMapping', 'productMapping.type = :productMappingType', { productMappingType: 0 }) // product_mapping에서 type=0 필터링
        .leftJoinAndSelect('productMapping.product', 'product') // product_mapping을 통해 product 조인
        .where('shop.id = :shopId', { shopId })
        .andWhere('shop.type = :type', { type: 0 }) // shop.type = 0 필터링
        .getOne();
    } catch (err) {
      this.loggerService.warn(`Shop/ findShopByShopId Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async findShopsWithin1Km(lat: number, lng: number, distanceLimit: number, radius: number, sortByReviewCount = false) {
    try {
      let query = this.shopRepository
        .createQueryBuilder('shop')
        .addSelect(
          `
        (${radius} * acos(
          cos(radians(:lat)) * cos(radians(shop.lat)) *
          cos(radians(shop.lng) - radians(:lng)) +
          sin(radians(:lat)) * sin(radians(shop.lat))
        ))`,
          'distance',
        )
        .where('shop.type = :type', { type: 0 }) // 특정 타입 필터링
        .having('distance < :distanceLimit', { distanceLimit }) // 거리 필터링
        .setParameters({ lat, lng });

      if (sortByReviewCount) {
        query = query
          .leftJoin('review', 'review', 'review.shopId = shop.id') // 리뷰 테이블 조인 (필요할 때만)
          .addSelect('COUNT(review.id)', 'reviewCount') // 리뷰 개수 추가
          .groupBy('shop.id') // 그룹화
          .orderBy('reviewCount', 'DESC'); // 리뷰 개수 기준 정렬
      }

      return await query.getRawMany(); // getRawMany() 사용하여 깔끔한 데이터 가져오기
    } catch (err) {
      this.loggerService.warn(`Shop/ findShopsWithin1Km Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }
  async findShopsByProductIds(productIds: number[]) {
    return this.createQueryBuilder('shop')
      .innerJoin('shop.productMappings', 'productMapping')
      .where('productMapping.product.id IN (:...productIds)', { productIds })
      .getMany();
  }

  async createNewShop(shop, regionId: number) {
    try {
      return await this.shopRepository.save({
        ...shop,
        type: 1,
        region: {
          id: regionId,
        },
      });
    } catch (err) {
      this.loggerService.warn(`Shop/ createNewShop Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async updateToUsingShop(shopId: number) {
    try {
      return await this.shopRepository.update({ id: shopId }, { type: 0 });
    } catch (err) {
      this.loggerService.warn(`Shop/ updateToUsingShop Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async deleteShop(shopId: number) {
    try {
      return await this.shopRepository.delete({ id: shopId });
    } catch (err) {
      this.loggerService.warn(`Shop/ deleteShop Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async findTemp() {
    return await this.shopRepository.find({
      where: {
        type: 0,
      },
    });
  }
}
