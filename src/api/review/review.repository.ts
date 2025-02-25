import { InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/database/entity/image.entity';
import { Review } from 'src/database/entity/review.entity';
import { Repository } from 'typeorm';

export class ReviewRepository {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,

    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async createReview(uuid, shopId, content) {
    try {
      return await this.reviewRepository.create({
        user: {
          uuid,
        },
        shop: {
          id: shopId,
        },
        content,
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async saveReview(review) {
    try {
      return await this.reviewRepository.save(review);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async findUserReviewByUUID(uuid: string) {
    try {
      return await this.reviewRepository.find({
        where: {
          user: { uuid },
        },
        relations: ['shop', 'images'],
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }
  async deleteImage(imageId) {
    try {
      return await this.imageRepository.delete({ id: imageId });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async createImage(url) {
    try {
      return this.imageRepository.create({
        url,
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async saveImage(image) {
    try {
      return await this.imageRepository.save(image);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async findReviewByReviewId(uuid, reviewId) {
    try {
      return await this.reviewRepository.findOne({
        where: {
          id: reviewId,
          user: { uuid },
        },
        relations: ['images'],
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async removeReview(review: Review) {
    try {
      return await this.reviewRepository.remove(review);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async findShopReviewsByShopId(shopId: number) {
    try {
      return await this.reviewRepository.find({
        where: {
          shop: {
            id: shopId,
          },
        },
        relations: ['images', 'user'],
        order: {
          createdAt: 'DESC', // 최신순
        },
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }
}
