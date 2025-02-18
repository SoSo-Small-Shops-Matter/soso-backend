import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AwsService } from '../aws/aws.service';
import { ReviewRepository } from '../review/review.repository';
import { SubmitRepository } from '../submit/submit.repository';
import { WishlistRepository } from '../wishlist/wishlist.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private awsService: AwsService,
    private reviewRepository: ReviewRepository,
    private wishlistRepository: WishlistRepository,
    private submitRepository: SubmitRepository,
  ) {}

  async findUserNickName(nickName: string) {
    return !!(await this.userRepository.findUserByNickName(nickName));
  }

  async findAndUpdateUserNickname(nickName: string, uuid: string) {
    const existNickName =
      await this.userRepository.findUserByNickName(nickName);
    if (existNickName) {
      throw new ConflictException('Nickname already exists.');
    }
    await this.userRepository.updateNickName(uuid, nickName);
  }
  async getUserProfile(uuid: string) {
    return await this.userRepository.findUserProfileByUUID(uuid);
  }

  async updateUserProfile(
    nickName: string,
    uuid: string,
    file: Express.Multer.File,
  ) {
    if (nickName) {
      const existNickName =
        await this.userRepository.findUserByNickName(nickName);
      if (existNickName) {
        throw new ConflictException('Nickname already exists.');
      }

      const newNickName = await this.userRepository.updateNickName(
        uuid,
        nickName,
      );
      if (newNickName.affected == 0) {
        throw new InternalServerErrorException();
      }
    }
    if (file) {
      const [photoUrl] = await this.awsService.uploadImagesToS3(file, 'jpg');
      const updateUrl = await this.userRepository.updateUserPhotoUrl(
        uuid,
        photoUrl,
      );
      if (updateUrl.affected == 0) {
        throw new InternalServerErrorException();
      }
    }
    return;
  }

  async findSubmitRecord(uuid: string) {
    return await this.submitRepository.findSubmitUserRecord(uuid);
  }

  async findUserReviews(uuid: string) {
    return await this.reviewRepository.findUserReviewByUUID(uuid);
  }

  async getWishlist(uuid: string) {
    const userWishlists =
      await this.wishlistRepository.findWishlistByUUID(uuid);
    if (!userWishlists) {
      throw new NotFoundException();
    }

    const result = userWishlists.map((data) => {
      return data.shop;
    });
    return result;
  }
}
