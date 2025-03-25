import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from './user.repository';
import { AwsService } from '../aws/aws.service';
import { ReviewRepository } from '../review/review.repository';
import { SubmitRepository } from '../submit/submit.repository';
import { WishlistRepository } from '../wishlist/wishlist.repository';
import { ImageRepository } from '../image/image.repository';
import { RecentSearchRepository } from '../recent-search/recent-search.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private awsService: AwsService,
    private reviewRepository: ReviewRepository,
    private wishlistRepository: WishlistRepository,
    private submitRepository: SubmitRepository,
    private imageRepository: ImageRepository,
    private recentSearchRepository: RecentSearchRepository,
  ) {}

  async findUserNickName(nickName: string) {
    return !!(await this.userRepository.findUserByNickName(nickName));
  }

  async findAndUpdateUserNickname(nickName: string, uuid: string) {
    const existNickName = await this.userRepository.findUserByNickName(nickName);
    if (existNickName) {
      throw new ConflictException('Nickname already exists.');
    }
    await this.userRepository.updateNickName(uuid, nickName);
  }

  async getUserProfile(uuid: string) {
    return await this.userRepository.findUserByUUID(uuid);
  }

  async updateUserProfile(nickName: string, uuid: string, file: Express.Multer.File) {
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
    return;
  }

  async findSubmitRecord(uuid: string, page: number, limit: number) {
    const userSubmits = await this.submitRepository.findUserSubmitUserRecord(uuid);
    const pageNationResult = await this.submitRepository.findUserSubmitUserRecordByPageNation(uuid, page, limit);
    const totalPages = Math.ceil(userSubmits.length / limit);
    const pageInfo = {
      page: Number(page),
      limit: Number(limit),
      totalElements: userSubmits.length,
      totalPages: totalPages,
      nextPage: page < totalPages,
    };
    return {
      data: pageNationResult,
      pageInfo,
    };
  }

  async findUserReviews(uuid: string, page: number, limit: number, sort: string) {
    const sortType = sort == 'ASC' ? 'ASC' : 'DESC';
    const userReviews = await this.reviewRepository.findUserReviewByUUID(uuid);
    const pageNationResult = await this.reviewRepository.findUserReviewByPageNation(uuid, page, limit, sortType);
    const totalPages = Math.ceil(userReviews.length / limit);
    const pageInfo = {
      page: Number(page),
      limit: Number(limit),
      totalElements: userReviews.length,
      totalPages: totalPages,
      nextPage: page < totalPages,
    };
    return {
      data: pageNationResult,
      pageInfo,
    };
  }

  async getWishlist(uuid: string, page: number, limit: number, area: string) {
    const userWishlists = await this.wishlistRepository.findUserWishlistByUUID(uuid, area);
    const pageNationResult = await this.wishlistRepository.findUserWishlistByPageNation(uuid, page, limit, area);

    const totalPages = Math.ceil(userWishlists.length / limit);
    const pageInfo = {
      page: Number(page),
      limit: Number(limit),
      totalElements: userWishlists.length,
      totalPages: totalPages,
      nextPage: page < totalPages,
    };
    return {
      data: pageNationResult,
      pageInfo,
    };
  }

  async deleteUser(uuid: string, deleteType: number) {
    const newUUID = uuidv4();
    const user = await this.userRepository.findUserByUUID(uuid);
    if (!user) throw new NotFoundException();
    // 유저 이미지 제거
    await this.imageRepository.deleteImageByUrl(user.photoUrl);
    // 유저 찜 데이터 제거
    await this.wishlistRepository.deleteWishlistByUUID(user.uuid);
    // submit_user_record 데이터 제거 -> 전부
    await this.submitRepository.deleteSubmitUserByUUID(user.uuid);
    // 최근 검색 기록 지우기
    await this.recentSearchRepository.deleteAllRecentSearch(user.uuid);

    await this.userRepository.saveDeleteUser(uuid, deleteType, newUUID);
    const deleteUser = await this.userRepository.findUserByUUID(newUUID);
    await this.userRepository.deleteUser(deleteUser);
  }
}
