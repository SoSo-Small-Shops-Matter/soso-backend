import { Injectable, NotFoundException } from '@nestjs/common';
import { ShopRepository } from './shop.repository';
import { ReviewService } from '../review/review.service';
import { WishlistRepository } from '../wishlist/wishlist.repository';
import { RegionRepository } from '../region/region.repository';
import { RecentSearchRepository } from '../recent-search/recent-search.repository';
import { GetSearchPageShopDTO, GetShopWithin1KmDTO } from './dto/paging.dto';
import { Paging, ResponsePageNationDTO } from '../shop/dto/paging.dto';
import { Shop } from '../../database/entity/shop.entity';
import { convertTimeToAmPm } from '../../common/function/time-to-am-pm.function';
import { User } from '../../database/entity/user.entity';
import { ProductMapping } from '../../database/entity/product_mapping.entity';

@Injectable()
export class ShopService {
  constructor(
    private shopRepository: ShopRepository,
    private reviewService: ReviewService,
    private wishlistRepository: WishlistRepository,
    private regionRepository: RegionRepository,
    private recentSearchRepository: RecentSearchRepository,
  ) {}

  async findShopsWithin1Km(getShopWithin1KmDTO: GetShopWithin1KmDTO, uuid: string) {
    const { lat, lng, sorting, isWishlist, productIds } = getShopWithin1KmDTO;
    const wishlistBoolean = isWishlist == 'true' ? true : false;
    const radius = 6371; // 지구 반경 (km)
    const distanceLimit = 1; // 거리 제한 (1km)
    
    let shops = await this.shopRepository.findShopsWithin1Km(lat, lng, distanceLimit, radius, sorting != false);
    
    // shop_ 프리픽스 제거 + 필요한 필드만 추출
    shops = shops.map((shop) => ({
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
      ...(sorting ? { reviewCount: Number(shop.reviewCount) } : {}),
    }));

    if (wishlistBoolean && uuid) {
      const wishlistShops = await this.wishlistRepository.findWishlistShopsByUser(uuid);
      const wishlistShopIds = wishlistShops.map(wishlist => wishlist.shop.id);
      shops = shops.filter(shop => wishlistShopIds.includes(shop.id));
    }

    if (productIds && productIds.length > 0) {
      const shopsWithProducts = await this.shopRepository.findShopsByProductIds(productIds);
      const shopIdsWithProducts = shopsWithProducts.map(shop => shop.id);
      shops = shops.filter(shop => shopIdsWithProducts.includes(shop.id));
    }

    return shops;
  }

  async findShopsByKeyword(getSearchPageShopDTO: GetSearchPageShopDTO) {
    const { keyword, page, limit } = getSearchPageShopDTO;
    const pageNationResult = await this.shopRepository.findShopsByKeyword(keyword, page, limit);
    const allShopsCount = await this.shopRepository.findAllShopsCountByKeyword(keyword);
    const totalPages = Math.ceil(allShopsCount / limit);
    const pageInfoDTO = new Paging(page, limit, allShopsCount, totalPages, page < totalPages);
    return new ResponsePageNationDTO<Shop>(pageNationResult, pageInfoDTO);
  }

  async findShopByShopId(shopId: number, uuid: string) {
    const imageList = [];
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
      startTime: convertTimeToAmPm(operating.startTime),
      endTime: convertTimeToAmPm(operating.endTime),
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
    userReviews.forEach((review) => {
      imageList.push(...review.images);
    });

    otherReviews.forEach((review) => {
      imageList.push(...review.images);
    });

    const wishlist = !!(await this.wishlistRepository.isShopInUserWishlist(shopId, uuid));

    const userRecenSearchtList = (await this.recentSearchRepository.findRecentSearchListByUUID(uuid)) || [];
    if (uuid) {
      const checkRecentSearchByShopName = await this.recentSearchRepository.checkRecentSearchByShopName(uuid, shop.name);
      if (!checkRecentSearchByShopName) {
        const newUserRecentSearch = await this.recentSearchRepository.createRecentSearch(uuid, shop.name, shopId);
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
      userReviews: userReviews.map((review) => ({
        ...review,
        user: {
          photoUrl: review.user?.photoUrl,
          nickName: review.user?.nickName,
        },
      })),
      otherReviews: otherReviews.map((review) => ({
        ...review,
        user: {
          photoUrl: review.user?.photoUrl,
          nickName: review.user?.nickName,
        },
      })),
      wishlist,
      imageList,
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
