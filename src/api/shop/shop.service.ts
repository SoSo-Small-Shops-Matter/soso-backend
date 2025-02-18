import { Injectable, NotFoundException } from '@nestjs/common';
import { ShopRepository } from './shop.repository';
import { UpdateShopProductsDto } from './dto/submit.dto';
import { Product } from 'src/database/entity/product.entity';
import { ReviewService } from '../review/review.service';
import { SubmitRepository } from '../submit/submit.repository';
import { WishlistRepository } from '../wishlist/wishlist.repository';

@Injectable()
export class ShopService {
  constructor(
    private shopRepository: ShopRepository,
    private reviewService: ReviewService,
    private submitRepository: SubmitRepository,
    private wishlistRepository: WishlistRepository,
  ) {}

  async findShopsWithin1Km(lat: number, lng: number, sorting: string) {
    const radius = 6371; // 지구 반경 (km)
    const distanceLimit = 1; // 거리 제한 (1km)
    const result = await this.shopRepository.findShopsWithin1Km(
      lat,
      lng,
      distanceLimit,
      radius,
      sorting != 'false',
    );
    return result;
  }
  async findShopsByShopName(shopName: string, pageSize: number, limit: number) {
    return await this.shopRepository.findShopsByShopName(
      shopName,
      pageSize,
      limit,
    );
  }

  async findShopByShopId(shopId: number, uuid: string) {
    const shop = await this.shopRepository.findShopByShopId(shopId);
    if (!shop) {
      throw new NotFoundException('NOT_FOUND_SHOP');
    }
    const { userReviews, otherReviews } =
      await this.reviewService.findShopReviewsByShopId(shopId, uuid);

    const wishlist = !!(await this.wishlistRepository.isShopInUserWishlist(
      shopId,
      uuid,
    ));

    return {
      shop,
      userReviews,
      otherReviews,
      wishlist,
    };
  }

  async updateShopProduct(
    updateShopProductsDto: UpdateShopProductsDto,
    uuid: string,
  ) {
    const { shopId, products } = updateShopProductsDto;
    const shop = await this.shopRepository.findShopByShopId(shopId);
    if (!shop) {
      throw new NotFoundException('NOT_FOUND_SHOP');
    }

    const productMappings = products.map((mapping) => {
      const product = new Product();
      product.id = mapping.id;
      return product;
    });

    shop.products = productMappings;

    await this.shopRepository.saveShopProduct(shop);

    return await this.submitRepository.createSubmitUserRecordByUpdateProducts(
      uuid,
      shop.id,
    );
  }

  async updateShopReportStatus(report: number, shopId: number) {
    return await this.shopRepository.updateShopReportStatusByShopId(
      report,
      shopId,
    );
  }
}
