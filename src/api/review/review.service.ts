import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { DeleteReviewDto, PostReviewDto, UpdateReviewDto } from './dto/review.dto';
import { AwsService } from '../aws/aws.service';
import { ReviewTransactionsRepository } from '../transactions/review.repository';

@Injectable()
export class ReviewService {
  constructor(
    private reviewRepository: ReviewRepository,
    private awsService: AwsService,
    private reviewTransactionsRepository: ReviewTransactionsRepository,
  ) {}

  async createReview(uuid: string, postReviewDto: PostReviewDto, files?: Express.Multer.File[]): Promise<void> {
    const { shopId, content } = postReviewDto;

    // 이미지 업로드 및 URL 생성 (파일이 없을 경우 빈 배열 반환)
    const imageUrls = files ? await this.awsService.uploadImagesToS3(files, 'jpg') : [];

    // 트랜잭션을 사용하여 Review 생성
    await this.reviewTransactionsRepository.createReview(uuid, Number(shopId), content, imageUrls);
  }

  async updateReview(uuid: string, updateReviewDto: UpdateReviewDto, newFiles?: Express.Multer.File[]): Promise<void> {
    const { reviewId, content, deleteImages } = updateReviewDto;

    // 새 파일이 존재하면 업로드
    const newImageUrls = newFiles?.length > 0 ? await this.awsService.uploadImagesToS3(newFiles, 'jpg') : [];

    // 트랜잭션을 사용하여 Review 업데이트
    await this.reviewTransactionsRepository.updateReview(uuid, reviewId, content, deleteImages || [], newImageUrls);
  }

  async deleteReviewByUUID(uuid: string, deleteReviewDto: DeleteReviewDto): Promise<void> {
    const { reviewId } = deleteReviewDto;
    await this.reviewTransactionsRepository.deleteReview(uuid, reviewId);
  }

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
