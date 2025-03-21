import { Injectable, NotFoundException } from '@nestjs/common';
import { ShopRepository } from './shop.repository';
import { UpdateShopProductsDto } from './dto/submit.dto';
import { Product } from 'src/database/entity/product.entity';
import { ReviewService } from '../review/review.service';
import { SubmitRepository } from '../submit/submit.repository';
import { WishlistRepository } from '../wishlist/wishlist.repository';
import { RegionRepository } from '../region/region.repository';
import { RecentSearchRepository } from '../recent-search/recent-search.repository';

@Injectable()
export class ShopService {
  constructor(
    private shopRepository: ShopRepository,
    private reviewService: ReviewService,
    private submitRepository: SubmitRepository,
    private wishlistRepository: WishlistRepository,
    private regionRepository: RegionRepository,
    private recentSearchRepository: RecentSearchRepository,
  ) {}

  async findShopsWithin1Km(lat: number, lng: number, sorting: string) {
    const radius = 6371; // 지구 반경 (km)
    const distanceLimit = 1; // 거리 제한 (1km)
    const result = await this.shopRepository.findShopsWithin1Km(lat, lng, distanceLimit, radius, sorting != 'false');
    // shop_ 프리픽스 제거 + 필요한 필드만 추출
    return result.map((shop) => ({
      id: shop.shop_id,
      name: shop.shop_name,
      type: shop.shop_type,
      image: shop.shop_image,
      reportStatus: shop.shop_reportStatus,
      lat: shop.shop_lat,
      lng: shop.shop_lng,
      location: shop.shop_location,
      regionId: shop.shop_regionId,
      distance: shop.distance,
      ...(sorting ? { reviewCount: Number(shop.reviewCount) } : {}), // sorting이 true일 때만 포함
    }));
  }
  async findShopsByKeyword(keyword: string, page: number, limit: number) {
    const result = await this.shopRepository.findShopsByKeyword(keyword, page, limit);
    const allShops = await this.shopRepository.findAllShopsByKeyword(keyword);
    const totalPages = Math.ceil(allShops.length / limit);
    const pageInfo = {
      page: Number(page),
      limit: Number(limit),
      totalElements: allShops.length,
      totalPages: totalPages,
      nextPage: page >= totalPages ? false : true,
    };
    return {
      data: result,
      pageInfo,
    };
  }

  async findShopByShopId(shopId: number, uuid: string) {
    const shop = await this.shopRepository.findShopByShopId(shopId);
    if (!shop) {
      throw new NotFoundException('NOT_FOUND_SHOP');
    }
    // "productMappings" 배열을 "products" 배열로 변환
    const products = shop.productMappings.map((mapping) => ({
      id: mapping.product.id,
      name: mapping.product.name,
    }));

    // 기존 shop 객체에서 "productMappings" 제거 후 "products" 추가
    const transformedShop = {
      ...shop,
      products, // 새로운 products 배열 추가
    };
    delete transformedShop.productMappings; // 기존 productMappings 제거

    const { userReviews, otherReviews, deletedUserReviews } = await this.reviewService.findShopReviewsByShopId(shopId, uuid);

    const wishlist = !!(await this.wishlistRepository.isShopInUserWishlist(shopId, uuid));

    const userRecenSearchtList = (await this.recentSearchRepository.findRecentSearchListByUUID(uuid)) || [];
    if (uuid) {
      const checkRecentSearchByShopName = await this.recentSearchRepository.checkRecentSearchByShopName(uuid, shop.name);
      if (!checkRecentSearchByShopName) {
        const newUserRecentSearch = await this.recentSearchRepository.createRecentSearch(uuid, shop.name);
        if (userRecenSearchtList.length == 10) {
          const deleteData = userRecenSearchtList.pop();
          await this.recentSearchRepository.deleteRecentSearch(deleteData.uuid, deleteData.shopName);
        }
        userRecenSearchtList.unshift(newUserRecentSearch);
        await this.recentSearchRepository.saveRecentSearch(userRecenSearchtList);
      }
    }

    return {
      shop: transformedShop,
      userReviews,
      otherReviews,
      deletedUserReviews,
      wishlist,
    };
  }

  async findAllShopRegion() {
    const regionList = await this.regionRepository.findAllRegions();
    const result = regionList.map((region) => {
      return region.name;
    });
    return result;
  }
}
