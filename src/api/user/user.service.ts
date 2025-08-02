import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AwsService } from '../aws/aws.service';
import { ReviewRepository } from '../review/review.repository';
import { SubmitRepository } from '../submit/submit.repository';
import { WishlistRepository } from '../wishlist/wishlist.repository';
import { RecentSearchRepository } from '../recent-search/recent-search.repository';
import { PageNationDTO, ReviewPageNationDTO, UpdateProfileDTO, WishlistPageNationDTO } from './dto/user.dto';
import { ResponseUserProfileDTO } from './dto/user-response.dto';
import { PagingDto, ResponsePageNationDTO } from './dto/paging.dto';
import { SubmitUserRecord } from '../../database/entity/submit-user.entity';
import { Review } from '../../database/entity/review.entity';
import { Wishlist } from '../../database/entity/wishlist.entity';
import { DeleteUserTransactionsRepository } from '../transactions/delete-user.repository';
import { SaveWishListDTO } from '../wishlist/dto/wishlist.dto';
import { RecentSearchDTO } from './dto/recent-search-response.dto';
import { DeleteRecentSearchDTO } from './dto/recent-search.dto';

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
  ) {}

  async findUserNickName(nickName: string): Promise<boolean> {
    return !!(await this.userRepository.findUserByNickName(nickName));
  }

  async getUserProfile(uuid: string): Promise<ResponseUserProfileDTO> {
    const userProfile = await this.userRepository.findUserByUUID(uuid);
    if (!userProfile) throw new NotFoundException('Not Found User');

    return new ResponseUserProfileDTO(userProfile);
  }

  async updateUserProfile(updateProfileDTO: UpdateProfileDTO, uuid: string, file: Express.Multer.File) {
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
    const pageNationResult = await this.submitRepository.findUserSubmitUserRecordByPageNation(uuid, page, limit);
    const totalPages = Math.ceil(userSubmitsCount / limit);
    const pageInfoDTO = new PagingDto(page, limit, userSubmitsCount, totalPages, page < totalPages);
    return new ResponsePageNationDTO<SubmitUserRecord>(pageNationResult, pageInfoDTO);
  }

  async findUserReviews(reviewPageNation: ReviewPageNationDTO, uuid: string) {
    const { sort, page, limit } = reviewPageNation;
    const sortType = sort == 'ASC' ? 'ASC' : 'DESC';
    const userReviewsCount = await this.reviewRepository.findUserReviewByUUID(uuid);
    const pageNationResult = await this.reviewRepository.findUserReviewByPageNation(uuid, page, limit, sortType);
    const totalPages = Math.ceil(userReviewsCount / limit);
    const pageInfoDTO = new PagingDto(page, limit, userReviewsCount, totalPages, page < totalPages);
    return new ResponsePageNationDTO<Review>(pageNationResult, pageInfoDTO);
  }

  async getUserWishlist(wishlistPageNation: WishlistPageNationDTO, uuid: string) {
    const { page, limit, area } = wishlistPageNation;
    const userWishlistsCount = await this.wishlistRepository.findUserWishlistByUUID(uuid, area);
    const pageNationResult = await this.wishlistRepository.findUserWishlistByPageNation(uuid, page, limit, area);
    const totalPages = Math.ceil(userWishlistsCount / limit);
    const pageInfoDTO = new PagingDto(page, limit, userWishlistsCount, totalPages, page < totalPages);
    return new ResponsePageNationDTO<Wishlist>(pageNationResult, pageInfoDTO);
  }

  async addUserWishlist(saveWishListDto: SaveWishListDTO, uuid: string) {
    const wishlist = await this.wishlistRepository.findWishlistByShopIdAndUUID(saveWishListDto.shopId, uuid);
    if (wishlist) return await this.wishlistRepository.deleteWishlistByWishlistId(wishlist.id);

    return await this.wishlistRepository.addWishlistByShopIdAndUUID(saveWishListDto.shopId, uuid);
  }

  async deleteUser(uuid: string, deleteType: number) {
    const user = await this.userRepository.findUserByUUID(uuid);
    if (!user) throw new NotFoundException();
    // 유저 이미지 제거
    await this.deleteUserTransactionsRepository.deleteUser(user, deleteType);
  }

  async getRecentSearch(uuid: string | null) {
    if (!uuid) return [];
    const result = await this.recentSearchRepository.findRecentSearchListByUUID(uuid);
    return result.map(RecentSearchDTO.fromEntity);
  }

  async deleteRecentSearch(uuid: string, deleteRecentSearchDTO: DeleteRecentSearchDTO) {
    const { recentSearchId } = deleteRecentSearchDTO;
    await this.recentSearchRepository.deleteRecentSearch(uuid, recentSearchId);
  }

  async deleteAllRecentSearch(uuid: string) {
    await this.recentSearchRepository.deleteAllRecentSearch(uuid);
  }
}
