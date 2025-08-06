import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  constructor(private reviewRepository: ReviewRepository) {}

  async findShopReviewsByShopId(shopId: number, uuid: string) {
    const reviews = await this.reviewRepository.findShopReviewsByShopId(shopId);
    const userReviews = reviews.filter((review) => review.user?.uuid === uuid);
    const otherReviews = reviews.filter((review) => review.user == null || review.user?.uuid != uuid);
    return {
      userReviews,
      otherReviews,
    };
  }
}
