import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AwsService } from '../aws/aws.service';
import { ReviewRepository } from '../review/review.repository';
import { SubmitRepository } from '../submit/submit.repository';
import { WishlistRepository } from '../wishlist/wishlist.repository';

import { UserDto, ValidateNickNameDTO } from './dto/query/user.dto';
import { PaginationQueryDTO, ReviewPaginationDTO, WishlistPageNationDTO } from './dto/query/pagination.dto';
import { UpdateProfileDTO } from './dto/requests/user_requests.dto';

import { User_responsesDto } from './dto/responses/user_responses.dto';
import { PageInfoDTO } from './dto/responses/pagination_responses.dto';
import { UserSubmitRecordDTO, UserSubmitRecordItemDTO } from './dto/responses/submit_responses.dto';
import { UserWishlistRecordDTO } from './dto/responses/wishlist_responses.dto';
import { UserReviewsRecordDTO } from './dto/responses/review_responses.dto';
import { Recent_search_responsesDto } from './dto/responses/recent_search_responses.dto';

import { SubmitUserRecord } from '../../database/entity/submit-user.entity';
import { DeleteUserTransactionsRepository } from '../transactions/delete-user.repository';
import { RecentSearchRepository } from '../recent-search/recent-search.repository';
import { SubmitType } from '../../common/enum/role.enum';
import { SubmitTransactionsRepository } from '../transactions/submit.repository';
import { ShopRepository } from '../shop/shop.repository';
import { Wishlist_requestsDto } from './dto/requests/wishlist_requests.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private awsService: AwsService,
    private reviewRepository: ReviewRepository,
    private wishlistRepository: WishlistRepository,
    private submitRepository: SubmitRepository,
    private recentSearchRepository: RecentSearchRepository,
    private deleteUserTransactionsRepository: DeleteUserTransactionsRepository,
    private submitTransactionsRepository: SubmitTransactionsRepository,
    private shopRepository: ShopRepository,
  ) {}

  async getUserProfile(uuid: string): Promise<User_responsesDto> {
    const userProfile = await this.userRepository.findUserByUUID(uuid);
    if (!userProfile) throw new NotFoundException('Not Found User');
    return new User_responsesDto(userProfile);
  }

  async updateUserProfile(updateProfileDTO: UpdateProfileDTO, uuid: string, file?: Express.Multer.File) {
    const { nickName } = updateProfileDTO;

    if (nickName) {
      const existNickName = await this.userRepository.findUserByNickName(nickName);
      if (existNickName) throw new ConflictException('Nickname already exists.');

      const newNickName = await this.userRepository.updateNickName(uuid, nickName);
      if (newNickName.affected == 0) throw new NotFoundException('Fail update nickname');
    }

    if (file) {
      const [photoUrl] = await this.awsService.uploadImagesToS3(file, 'jpg');
      if (!photoUrl) throw new NotFoundException('Not Exists photo');

      const updateUrl = await this.userRepository.updateUserPhotoUrl(uuid, photoUrl);
      if (updateUrl.affected == 0) throw new NotFoundException('Fail update profileImg');
    }
  }

  async deleteUser(uuid: string, deleteTypeDTO: UserDto) {
    const user = await this.userRepository.findUserByUUID(uuid);
    await this.deleteUserTransactionsRepository.deleteUser(user, deleteTypeDTO.deleteType);
  }

  async findUserNickName(nickNameDTO: ValidateNickNameDTO): Promise<boolean> {
    const { nickName } = nickNameDTO;
    return !!(await this.userRepository.findUserByNickName(nickName));
  }

  async findUserShopSubmissions(pageNation: PaginationQueryDTO, uuid: string) {
    const { page, limit } = pageNation;
    const totalCount = await this.submitRepository.findUserSubmitUserRecord(uuid);
    const rows: SubmitUserRecord[] = await this.submitRepository.findUserSubmitUserRecordByPageNation(uuid, page, limit);

    const mapped: UserSubmitRecordItemDTO[] = rows.map((record) => new UserSubmitRecordItemDTO(record));
    const pageInfo = new PageInfoDTO(page, limit, totalCount);

    return new UserSubmitRecordDTO(mapped, pageInfo);
  }

  async findUserReviews(reviewPageNation: ReviewPaginationDTO, uuid: string) {
    const { sort, page, limit } = reviewPageNation;
    const sortType = sort === 'ASC' ? 'ASC' : 'DESC';

    const totalCount = await this.reviewRepository.findUserReviewByUUID(uuid);
    const rows = await this.reviewRepository.findUserReviewByPageNation(uuid, page, limit, sortType);

    const pageInfo = new PageInfoDTO(page, limit, totalCount);
    return new UserReviewsRecordDTO(rows, pageInfo);
  }

  async getUserWishlists(wishlistPageNation: WishlistPageNationDTO, uuid: string) {
    const { page, limit, areaId } = wishlistPageNation;

    const totalCount = await this.wishlistRepository.findUserWishlistByUUID(uuid, areaId);
    const rows = await this.wishlistRepository.findUserWishlistByPageNation(uuid, page, limit, areaId);

    const pageInfo = new PageInfoDTO(page, limit, totalCount);
    return new UserWishlistRecordDTO(rows, pageInfo);
  }

  async addUserWishlist(saveWishListDTO: Wishlist_requestsDto, uuid: string) {
    const { shopId } = saveWishListDTO;

    const shop = await this.shopRepository.findShopByShopId(shopId);
    if (!shop) throw new NotFoundException('Not Found Shop'); // 오타 수정

    const wishlist = await this.wishlistRepository.findWishlistByShopIdAndUUID(shopId, uuid);
    if (wishlist) return await this.wishlistRepository.deleteWishlistByWishlistId(wishlist.id);

    return await this.wishlistRepository.addWishlistByShopIdAndUUID(shopId, uuid);
  }

  async getUserRecentSearches(uuid: string) {
    if (!uuid) return [];
    const result = await this.recentSearchRepository.findRecentSearchListByUUID(uuid);
    return Recent_search_responsesDto.fromEntities(result);
  }

  async deleteAllRecentSearch(uuid: string) {
    await this.recentSearchRepository.deleteAllRecentSearch(uuid);
  }

  async deleteRecentSearchById(uuid: string, recentSearchId: number) {
    await this.recentSearchRepository.deleteRecentSearch(uuid, recentSearchId);
  }

  async deleteUserShopSubmission(submitId: number, uuid: string): Promise<void> {
    const submitRecord = await this.submitRepository.findSubmitRecordById(submitId, uuid);
    if (!submitRecord) throw new NotFoundException('Not found Submission');

    switch (submitRecord.type) {
      case SubmitType.NewShop:
        await this.submitTransactionsRepository.deleteShopSubmission(submitRecord.shop.id);
        break;
      case SubmitType.NewOperating:
        await this.submitTransactionsRepository.deleteOperatingHoursSubmission(submitId, submitRecord.operatingId);
        break;
      case SubmitType.NewProduct:
        await this.submitTransactionsRepository.deleteProductSubmission(submitRecord.shop.id, uuid);
        break;
      default:
        throw new NotFoundException('Invalid submit type');
    }
  }
}
