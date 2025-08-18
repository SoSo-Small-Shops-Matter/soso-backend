import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ShopRepository } from './shop.repository';
import { WishlistRepository } from '../wishlist/wishlist.repository';
import { RegionRepository } from '../region/region.repository';
import { RecentSearchRepository } from '../recent-search/recent-search.repository';
import { convertTimeToAmPm } from '../../common/function/time-to-am-pm.function';
import { getLastSegment } from 'src/common/function/get-insta-id';
import { SubmitTransactionsRepository } from '../transactions/submit.repository';
import { SubmitRepository } from '../submit/submit.repository';
import { ReviewRepository } from '../review/review.repository';
import { AwsService } from '../aws/aws.service';
import { ReviewTransactionsRepository } from '../transactions/review.repository';
import { ReviewService } from '../review/review.service';
import { ReportRepository } from '../report/report.repository';
import { GetSearchPageShopDTO, GetShopWithin1KmDTO } from './dto/query/pagination.dto';
import { SubmitNewProductsDto, SubmitNewShopDto, SubmitShopOperatingHoursDto } from './dto/requests/submit_shop_requests.dto';
import { PostReviewDto, UpdateReviewDto } from './dto/requests/review_request.dto';
import { Paging } from './dto/responses/pagination_response.dto';
import { ShopSearchPageNationResultDTO } from './dto/responses/shop_response.dto';
import { ReviewReportDto, ShopReportDto } from './dto/requests/report_request';

@Injectable()
export class ShopService {
  constructor(
    private shopRepository: ShopRepository,
    private reviewService: ReviewService,
    private wishlistRepository: WishlistRepository,
    private regionRepository: RegionRepository,
    private recentSearchRepository: RecentSearchRepository,
    private submitTransactionsRepository: SubmitTransactionsRepository,
    private submitRepository: SubmitRepository,
    private reviewRepository: ReviewRepository,
    private awsService: AwsService,
    private reviewTransactionsRepository: ReviewTransactionsRepository,
    private reportRepository: ReportRepository,
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
    }));

    if (wishlistBoolean && uuid) {
      const wishlistShops = await this.wishlistRepository.findWishlistShopsByUser(uuid);
      const wishlistShopIds = wishlistShops.map((wishlist) => wishlist.shop.id);
      shops = shops.filter((shop) => wishlistShopIds.includes(shop.id));
    }

    if (productIds && productIds.length > 0) {
      const shopsWithProducts = await this.shopRepository.findShopsByProductIds(productIds);
      const shopIdsWithProducts = shopsWithProducts.map((shop) => shop.id);
      shops = shops.filter((shop) => shopIdsWithProducts.includes(shop.id));
    }

    return shops;
  }

  async findShopsByKeyword(getSearchPageShopDTO: GetSearchPageShopDTO) {
    const { keyword, page, limit, lat, lng } = getSearchPageShopDTO;
    const radius = 6371; // 지구 반경 (km)

    const rawResults = await this.shopRepository.findShopsByKeyword(keyword, page, limit, lat, lng, radius);

    const mappedResults = rawResults.map((shop) => ({
      id: shop.shop_id,
      name: shop.shop_name,
      image: shop.shop_image,
      location: shop.shop_location,
      distance: shop.distance,
    }));

    const allShopsCount = await this.shopRepository.findAllShopsCountByKeyword(keyword);
    const totalPages = Math.ceil(allShopsCount / limit);
    const pageInfoDTO = new Paging(page, limit, allShopsCount, totalPages, page < totalPages);

    return new ShopSearchPageNationResultDTO(mappedResults, pageInfoDTO);
  }

  async createNewShop(newShopData: SubmitNewShopDto, uuid: string): Promise<void> {
    const region = await this.regionRepository.findRegionByLocation(newShopData.shop.location);
    if (!region) throw new NotFoundException('check region location');
    await this.submitTransactionsRepository.createNewShop(newShopData, region.id, uuid);
  }

  async findTemp() {
    const shop = await this.shopRepository.findTemp();
    return shop.map((shop) => ({
      id: shop.id,
      name: shop.name,
      image: shop.image,
      location: shop.location,
    }));
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
      instagramId: getLastSegment(shop.instagram),
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
          await this.recentSearchRepository.deleteRecentSearch(deleteData.uuid, deleteData.id);
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

  async validateAndUpdateOperatingHours(shopId: number, operatingData: SubmitShopOperatingHoursDto, uuid: string): Promise<void> {
    // 운영정보 업데이트시 해당 소품샵이 존재하는지 체크
    const shop = await this.shopRepository.findOnlyShopByShopId(shopId);
    if (!shop) throw new ConflictException('Not Exist Shop');

    const existData = await this.submitRepository.findUserSubmitRecordByType(uuid, shopId, 1);
    if (existData) throw new ConflictException('Exist Data');

    await this.submitTransactionsRepository.createOperatingHours(shopId, operatingData, uuid);
  }

  async validateAndUpdateProducts(shopId: number, productsData: SubmitNewProductsDto, uuid: string): Promise<void> {
    const shop = await this.shopRepository.findOnlyShopByShopId(shopId);
    if (!shop) throw new ConflictException('Not Exist Shop');

    const existData = await this.submitRepository.findUserSubmitRecordByType(uuid, shopId, 2);
    if (existData) throw new ConflictException('Exist Data');

    await this.submitTransactionsRepository.createProducts(shopId, productsData, uuid);
  }

  async createReview(uuid: string, postReviewDto: PostReviewDto, shopId: number, files?: Express.Multer.File[]): Promise<void> {
    const { content } = postReviewDto;

    const shop = await this.shopRepository.findOnlyShopByShopId(shopId);
    if (!shop) throw new ConflictException('Not Exist Shop');

    // 이미지 업로드 및 URL 생성 (파일이 없을 경우 빈 배열 반환)
    const imageUrls = files ? await this.awsService.uploadImagesToS3(files, 'jpg') : [];

    // 트랜잭션을 사용하여 Review 생성
    await this.reviewTransactionsRepository.createReview(uuid, Number(shopId), content, imageUrls);
  }

  async updateReview(
    uuid: string,
    updateReviewDto: UpdateReviewDto,
    shopId: number,
    reviewId: number,
    newFiles?: Express.Multer.File[],
  ): Promise<void> {
    const { content, deleteImages } = updateReviewDto;

    const shop = await this.shopRepository.findOnlyShopByShopId(shopId);
    if (!shop) throw new ConflictException('Not Exist Shop');

    // 새 파일이 존재하면 업로드
    const newImageUrls = newFiles?.length > 0 ? await this.awsService.uploadImagesToS3(newFiles, 'jpg') : [];

    // 트랜잭션을 사용하여 Review 업데이트
    await this.reviewTransactionsRepository.updateReview(uuid, reviewId, content, deleteImages || [], newImageUrls);
  }

  async deleteReviewByUUID(uuid: string, shopId: number, reviewId: number): Promise<void> {
    const shop = await this.shopRepository.findOnlyShopByShopId(shopId);
    if (!shop) throw new ConflictException('Not Exist Shop');

    const existData = await this.reportRepository.findReviewReport(uuid, reviewId);
    if (!existData) throw new ConflictException('Not Exist Review');

    await this.reviewTransactionsRepository.deleteReview(uuid, reviewId);
  }

  async reportReview(uuid: string, reviewReportDto: ReviewReportDto, shopId: number, reviewId: number): Promise<void> {
    const { status, message } = reviewReportDto;

    const shop = await this.shopRepository.findOnlyShopByShopId(shopId);
    if (!shop) throw new ConflictException('Not Exist Shop');

    const review = await this.reviewRepository.findOneReviewById(reviewId);
    if (!review) throw new NotFoundException('Not exist review');

    const existData = await this.reportRepository.findReviewReport(uuid, reviewId);
    if (existData) throw new ConflictException('Exist Report Review');

    await this.reportRepository.saveReviewReport(uuid, reviewId, status, message);
  }

  async reportShop(uuid: string, shopReportDto: ShopReportDto, shopId: number): Promise<void> {
    const { status, message } = shopReportDto;

    const shop = await this.shopRepository.findOnlyShopByShopId(shopId);
    if (!shop) throw new NotFoundException('Not exist shop');

    const existData = await this.reportRepository.findShopReport(uuid, shopId);
    if (existData) throw new ConflictException('Exist Report Shop');

    await this.reportRepository.saveShopReport(uuid, shop.id, status, message);
  }
}
