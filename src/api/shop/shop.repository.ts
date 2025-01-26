import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from 'src/database/entity/shop.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ShopRepository {
    constructor(
        @InjectRepository(Shop)
        private shopRepository:Repository<Shop>
    ) {}

    async findAllShop(){
        try{
            return await this.shopRepository.find();
        }catch(err){
            console.error("Shop/findAllShop Error", err); // 에러 로그 추가
            throw new InternalServerErrorException();
        }
    }

    async findOnlyShopByShopId(shopId:number){
        try{
            return await this.shopRepository.findOne({
                where:{id:shopId},
            });
        }catch(err){
            console.error("Shop/findOnlyShopByShopId Error", err); // 에러 로그 추가
            throw new InternalServerErrorException();
        }
    }
    
    async findShopByShopId(shopId:number){
        try{
            return await this.shopRepository.findOne({
                where:{id:shopId},
                relations:['operatingHours','products'],
            });
        }catch(err){
            console.error("Shop/findShopByShopId Error", err); // 에러 로그 추가
            throw new InternalServerErrorException();
        }
    }

    async saveShopProduct(shop:any){
        try{
            await this.shopRepository.save(shop);
            return shop;
        }catch(err){
            console.error("Shop/saveShopProduct Error",err);
            throw new InternalServerErrorException();
        }
    }
    async findShopsWithin1Km(lat: number, lng: number, distanceLimit: number, radius: number ): Promise<Shop[]> {
        try{
            return this.shopRepository
            .createQueryBuilder('shop')
            .addSelect(`
              (${radius} * acos(
                cos(radians(:lat)) * cos(radians(shop.lat)) *
                cos(radians(shop.lng) - radians(:lng)) +
                sin(radians(:lat)) * sin(radians(shop.lat))
              ))`, 'distance')
            .having('distance < :distanceLimit', { distanceLimit })
            .setParameters({ lat, lng })
            .getMany();
        }catch(err){
            console.error("Shop/findShopsWithin1Km Error",err);
            throw new InternalServerErrorException();
        }
    }

    async findShopsWithin1KmAndSortByReviewCount(lat: number, lng: number, distanceLimit: number, radius: number){
        try{
            return this.shopRepository
            .createQueryBuilder('shop')
            .leftJoin('review', 'review', 'review.shopId = shop.id') // reviews 테이블과 조인
            .addSelect(`
                (${radius} * acos(
                cos(radians(:lat)) * cos(radians(shop.lat)) *
                cos(radians(shop.lng) - radians(:lng)) +
                sin(radians(:lat)) * sin(radians(shop.lat))
                ))`, 'distance')
            .addSelect('COUNT(review.id)', 'reviewCount') // 리뷰 개수 계산
            .where(`
                (${radius} * acos(
                cos(radians(:lat)) * cos(radians(shop.lat)) *
                cos(radians(shop.lng) - radians(:lng)) +
                sin(radians(:lat)) * sin(radians(shop.lat))
                )) < :distanceLimit
            `) // 거리 조건
            .setParameters({ lat, lng, distanceLimit })
            .groupBy('shop.id') // shop 별로 그룹화
            .orderBy('reviewCount', 'DESC') // 리뷰 갯수로 정렬
            .getRawAndEntities();
        }catch(err){
            console.error("Shop/findShopsWithin1KmAndSortByReviewCount Error",err);
            throw new InternalServerErrorException();
        }
    }

    async findReportedShops(report:number){
        try{
            return await this.shopRepository.find({
                where: { reportStatus: report },
            });
        }catch(err){
            console.error("Shop/findReportedShops Error",err);
            throw new InternalServerErrorException();
        }
    }


    async updateShopReportStatusByShopId(report: number, shopId: number){
        try{
            return await this.shopRepository.update(
                { id: shopId },            // 조건
                { reportStatus: report }  
            );
        }catch(err){
            console.error("Shop/updateShopReportStatusByShopId Error",err);
            throw new InternalServerErrorException();
        }
    }
}
