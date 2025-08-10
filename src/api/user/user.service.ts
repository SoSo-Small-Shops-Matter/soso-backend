import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AwsService } from '../aws/aws.service';
import { ReviewRepository } from '../review/review.repository';
import { SubmitRepository } from '../submit/submit.repository';
import { WishlistRepository } from '../wishlist/wishlist.repository';
import {
  CheckNickNameDTO,
  DeleteSubmitRecordParamDto,
  DeleteTypeDTO,
  PageNationDTO,
  ReviewPageNationDTO,
  SaveWishListDTO,
  UpdateProfileDTO,
  UserProfileDTO,
  WishlistPageNationDTO,
} from './dto/user.dto';
import { PagingDto, UserReviewsRecordDTO, UserSubmitRecordDTO, UserSubmitRecordItemDTO, UserWishlistRecordDTO } from './dto/paging.dto';
import { SubmitUserRecord } from '../../database/entity/submit-user.entity';
import { DeleteUserTransactionsRepository } from '../transactions/delete-user.repository';
import { RecentSearchDTO } from '../recent-search/dto/recent-search-response.dto';
import { DeleteRecentSearchDTO } from '../recent-search/dto/recent-search.dto';
import { RecentSearchRepository } from '../recent-search/recent-search.repository';
import { SubmitType } from '../../common/enum/role.enum';
import { SubmitTransactionsRepository } from '../transactions/submit.repository';

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
  ) {}

  async findUserNickName(nickNameDTO: CheckNickNameDTO): Promise<boolean> {
    const { nickName } = nickNameDTO;
    return !!(await this.userRepository.findUserByNickName(nickName));
  }

  async getUserProfile(uuid: string): Promise<UserProfileDTO> {
    const userProfile = await this.userRepository.findUserByUUID(uuid);
    if (!userProfile) throw new NotFoundException('Not Found User');

    return new UserProfileDTO(userProfile);
  }

  async updateUserProfile(updateProfileDTO: UpdateProfileDTO, uuid: string, file?: Express.Multer.File) {
    const { nickName } = updateProfileDTO;
    if (nickName) {
      const existNickName = await this.userRepository.findUserByNickName(nickName);
      if (existNickName) {
        throw new ConflictException('Nickname already exists.');
      }

      const newNickName = await this.userRepository.updateNickName(uuid, nickName);
      if (newNickName.affected == 0) {
        throw new InternalServerErrorException();
      }
    }
    if (file) {
      const [photoUrl] = await this.awsService.uploadImagesToS3(file, 'jpg');
      const updateUrl = await this.userRepository.updateUserPhotoUrl(uuid, photoUrl);
      if (updateUrl.affected == 0) {
        throw new InternalServerErrorException();
      }
    }
  }

  async findSubmitRecord(pageNation: PageNationDTO, uuid: string) {
    const { page, limit } = pageNation;
    const userSubmitsCount = await this.submitRepository.findUserSubmitUserRecord(uuid);
    const pageNationResult: SubmitUserRecord[] = await this.submitRepository.findUserSubmitUserRecordByPageNation(uuid, page, limit);
    const mappedResult: UserSubmitRecordItemDTO[] = pageNationResult.map((record) => new UserSubmitRecordItemDTO(record));
    const totalPages = Math.ceil(userSubmitsCount / limit);
    const pageInfoDTO = new PagingDto(page, limit, userSubmitsCount, totalPages, page < totalPages);
    return new UserSubmitRecordDTO(mappedResult, pageInfoDTO);
  }

  async findUserReviews(reviewPageNation: ReviewPageNationDTO, uuid: string) {
    const { sort, page, limit } = reviewPageNation;
    const sortType = sort == 'ASC' ? 'ASC' : 'DESC';
    const userReviewsCount = await this.reviewRepository.findUserReviewByUUID(uuid);
    const pageNationResult = await this.reviewRepository.findUserReviewByPageNation(uuid, page, limit, sortType);
    const totalPages = Math.ceil(userReviewsCount / limit);
    const pageInfoDTO = new PagingDto(page, limit, userReviewsCount, totalPages, page < totalPages);
    return new UserReviewsRecordDTO(pageNationResult, pageInfoDTO);
  }

  async getWishlist(wishlistPageNation: WishlistPageNationDTO, uuid: string) {
    const { page, limit, areaId } = wishlistPageNation;
    const userWishlistsCount = await this.wishlistRepository.findUserWishlistByUUID(uuid, areaId);
    const pageNationResult = await this.wishlistRepository.findUserWishlistByPageNation(uuid, page, limit, areaId);
    const totalPages = Math.ceil(userWishlistsCount / limit);
    const pageInfoDTO = new PagingDto(page, limit, userWishlistsCount, totalPages, page < totalPages);
    return new UserWishlistRecordDTO(pageNationResult, pageInfoDTO);
  }

  async deleteUser(uuid: string, deleteTypeDTO: DeleteTypeDTO) {
    const user = await this.userRepository.findUserByUUID(uuid);
    if (!user) throw new NotFoundException();
    // 유저 이미지 제거
    await this.deleteUserTransactionsRepository.deleteUser(user, deleteTypeDTO.deleteType);
  }

  async addWishlistByShopIdAndUUID(saveWishListDTO: SaveWishListDTO, uuid: string) {
    const { shopId } = saveWishListDTO;
    const wishlist = await this.wishlistRepository.findWishlistByShopIdAndUUID(shopId, uuid);
    if (wishlist) return await this.wishlistRepository.deleteWishlistByWishlistId(wishlist.id);
    await this.wishlistRepository.addWishlistByShopIdAndUUID(shopId, uuid);
  }

  async getRecentSearch(uuid: string | null) {
    if (!uuid) return [];
    const result = await this.recentSearchRepository.findRecentSearchListByUUID(uuid);
    return result.map(RecentSearchDTO.fromEntity);
  }

  async deleteAllRecentSearch(uuid: string) {
    await this.recentSearchRepository.deleteAllRecentSearch(uuid);
  }

  async deleteRecentSearchById(uuid: string, deleteRecentSearchDTO: DeleteRecentSearchDTO) {
    const { recentSearchId } = deleteRecentSearchDTO;
    await this.recentSearchRepository.deleteRecentSearch(uuid, recentSearchId);
  }

  async deleteSubmitRecord(deleteSubmitRecordParamDto: DeleteSubmitRecordParamDto, uuid: string): Promise<void> {
    const { submitId } = deleteSubmitRecordParamDto;
    const submitRecord = await this.submitRepository.findSubmitRecordById(submitId, uuid);

    if (!submitRecord) throw new NotFoundException();

    switch (submitRecord.type) {
      case SubmitType.NewShop: // 최초 제보
        await this.submitTransactionsRepository.deleteShopSubmission(submitRecord.shop.id);
        break;
      case SubmitType.NewOperating: // 운영 정보 수정
        await this.submitTransactionsRepository.deleteOperatingHoursSubmission(submitId, submitRecord.operatingId);
        break;
      case SubmitType.NewProduct: // 판매 정보 수정
        await this.submitTransactionsRepository.deleteProductSubmission(submitRecord.shop.id, uuid);
        break;
      default:
        throw new NotFoundException('Invalid submit type');
    }
  }
}
