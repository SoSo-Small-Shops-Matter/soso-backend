import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from 'src/database/entity/shop.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class ShopRepository {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  async findShopsByShopName(shopName: string, page: number, limit: number) {
    try {
      return await this.shopRepository
        .createQueryBuilder('shop')
        .where('shop.name LIKE :name', { name: `%${shopName}%` }) // 부분 검색
        .andWhere('shop.type = :type', { type: 0 }) // 특정 타입 필터링
        .skip(limit * (page - 1)) // offset 계산
        .take(limit) // 한 페이지당 표시할 개수
        .getMany();
    } catch (err) {
      console.error('Shop/findShopsByShopName Error', err);
      throw new InternalServerErrorException();
    }
  }

  async findAllShopsByShopName(shopName: string) {
    try {
      return await this.shopRepository
        .createQueryBuilder('shop')
        .where('shop.name LIKE :name', { name: `%${shopName}%` }) // 부분 검색
        .andWhere('shop.type = :type', { type: 0 }) // 특정 타입 필터링
        .getMany();
    } catch (err) {
      console.error('Shop/findAllShopsByShopName Error', err);
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
      console.error('Shop/findOnlyShopByShopId Error', err); // 에러 로그 추가
      throw new InternalServerErrorException();
    }
  }

  async findShopByShopId(shopId: number) {
    try {
      return await this.shopRepository
        .createQueryBuilder('shop')
        .leftJoinAndSelect('shop.operatingHours', 'operatingHours', 'operatingHours.type = :operatingHoursType', { operatingHoursType: 0 }) // operatingHours.type = 0 조건
        .leftJoinAndSelect('shop.products', 'products') // products는 조건 없이 조인
        .where('shop.id = :shopId', { shopId })
        .andWhere('shop.type = :type', { type: 0 }) // shop.type = 0 조건
        .getOne();
    } catch (err) {
      console.error('Shop/findShopByShopId Error', err); // 에러 로그 추가
      throw new InternalServerErrorException();
    }
  }

  async saveShopProduct(shop: any) {
    try {
      await this.shopRepository.save(shop);
      return shop;
    } catch (err) {
      console.error('Shop/saveShopProduct Error', err);
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
      console.error('Shop/findShopsWithin1Km Error', err);
      throw new InternalServerErrorException();
    }
  }

  async findReportedAllShops() {
    try {
      return await this.shopRepository.find({
        where: {
          reportStatus: Not(0), // 0 (신고되지 않음)이 아닌 모든 소품샵들 (1또는 2)
          type: 0, // 확인 완료된 소품샵들
        },
      });
    } catch (err) {
      console.error('Shop/findReportedShops Error', err);
      throw new InternalServerErrorException();
    }
  }

  async updateShopReportStatusByShopId(report: number, shopId: number) {
    try {
      return await this.shopRepository.update(
        { id: shopId }, // 조건
        { reportStatus: report },
      );
    } catch (err) {
      console.error('Shop/updateShopReportStatusByShopId Error', err);
      throw new InternalServerErrorException();
    }
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
      console.error('Shop/createNewShop Error', err); // 에러 로그 추가
      throw new InternalServerErrorException();
    }
  }

  async createNewShopForUpdateOperatingHours(name, lat, lng, location) {
    try {
      return await this.shopRepository.save({
        name,
        type: 1,
        lat,
        lng,
        location,
        existShop: true,
      });
    } catch (err) {
      console.error('shop/createNewShopForUpdateOperatingHours Error', err); // 에러 로그 추가
      throw new InternalServerErrorException();
    }
  }

  async findSubmitedAllShops() {
    try {
      return await this.shopRepository.find({
        where: {
          type: 1,
        },
        relations: ['operatingHours', 'products'],
      });
    } catch (err) {
      console.error('shop/findSubmitedAllShops Error', err);
      throw new InternalServerErrorException();
    }
  }
}
