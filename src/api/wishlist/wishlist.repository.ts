import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from 'src/database/entity/wishlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishlistRepository {
  constructor(
    @InjectRepository(Wishlist)
    private whishlistRepository: Repository<Wishlist>,
  ) {}

  async findWishlistByShopIdAndUUID(shopId: number, uuid: string) {
    try {
      return await this.whishlistRepository.findOne({
        where: {
          user: { uuid },
          shop: { id: shopId },
        },
        relations: ['user', 'shop'],
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async deleteWishlistByWishlistId(wishlistId: number) {
    try {
      return await this.whishlistRepository.delete({
        id: wishlistId,
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async addWishlistByShopIdAndUUID(shopId: number, uuid: string) {
    try {
      return await this.whishlistRepository.save({
        user: { uuid }, // User 엔티티와 연결
        shop: { id: shopId }, // Shop 엔티티와 연결
      });
    } catch (err) {
      console.error(err);
      if (err.code == 'ER_DUP_ENTRY') {
        throw new ConflictException('이미 존재하는 데이터입니다');
      }
      throw new InternalServerErrorException();
    }
  }

  async findUserWishlistByUUID(uuid: string) {
    try {
      return await this.whishlistRepository.find({
        where: { user: { uuid } },
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async findUserWishlistByPageNation(uuid: string, page: number, limit: number, area: string) {
    try {
      return await this.whishlistRepository
        .createQueryBuilder('wishlist') // ✅ 엔티티 별칭
        .leftJoinAndSelect('wishlist.shop', 'shop') // ✅ shop 관계 조인
        .leftJoinAndSelect('shop.region', 'region') // ✅ region 조인 추가
        .where('wishlist.userUuid = :uuid', { uuid }) // ✅ 사용자 필터링
        .andWhere('region.name = :area', { area }) // ✅ 올바른 참조 방식
        .skip(limit * (page - 1)) // ✅ offset 설정 (페이징)
        .take(limit) // ✅ limit 설정
        .getMany();
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async isShopInUserWishlist(shopId: number, uuid: string) {
    try {
      return await this.whishlistRepository.findOne({
        where: {
          user: { uuid },
          shop: { id: shopId },
        },
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }
}
