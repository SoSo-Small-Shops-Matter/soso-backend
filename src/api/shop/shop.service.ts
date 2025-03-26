import { Injectable, NotFoundException } from '@nestjs/common';
import { ShopRepository } from './shop.repository';
import { ReviewService } from '../review/review.service';
import { SubmitRepository } from '../submit/submit.repository';
import { WishlistRepository } from '../wishlist/wishlist.repository';
import { RegionRepository } from '../region/region.repository';
import { RecentSearchRepository } from '../recent-search/recent-search.repository';
import { GetSearchPageShopDTO, GetShopWithin1KmDTO } from './dto/paging.dto';

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

  async findShopsWithin1Km(getShopWithin1KmDTO: GetShopWithin1KmDTO) {
    const { lat, lng, sorting } = getShopWithin1KmDTO;
    const radius = 6371; // 지구 반경 (km)
    const distanceLimit = 1; // 거리 제한 (1km)
    const result = await this.shopRepository.findShopsWithin1Km(lat, lng, distanceLimit, radius, sorting != false);
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
  async findShopsByKeyword(getSearchPageShopDTO: GetSearchPageShopDTO) {
    const { keyword, page, limit } = getSearchPageShopDTO;
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
  convertTimeToAmPm(timeStr: string) {
    const [hourStr, minuteStr] = timeStr.split(':');
    const hour = parseInt(hourStr, 10);
    const period = hour < 12 ? '오전' : '오후';
    return `${period} ${hourStr.padStart(2, '0')}:${minuteStr}`;
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
    const operatingHours = shop.operatingHours.map((operating) => ({
      ...operating,
      startTime: this.convertTimeToAmPm(operating.startTime),
      endTime: this.convertTimeToAmPm(operating.endTime),
    }));

    delete shop.productMappings; // 기존 productMappings 제거
    delete shop.operatingHours;

    // 기존 shop 객체에서 "productMappings" 제거 후 "products" 추가
    const transformedShop = {
      ...shop,
      operatingHours,
      products, // 새로운 products 배열 추가
    };

    const { userReviews, otherReviews } = await this.reviewService.findShopReviewsByShopId(shopId, uuid);

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
