import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { DeleteReviewDto, PostReviewDto, UpdateReviewDto } from './dto/review.dto';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class ReviewService {
  constructor(
    private reviewRepository: ReviewRepository,
    private awsService: AwsService,
  ) {}

  async createReview(uuid: string, postReviewDto: PostReviewDto, files?: Express.Multer.File[] | Express.Multer.File) {
    const { shopId, content } = postReviewDto;

    // 이미지 업로드 및 URL 생성 (파일이 없을 경우 빈 배열 반환)
    const imageUrls = files ? await this.awsService.uploadImagesToS3(files, 'jpg') : [];

    // Review 생성
    const review = await this.reviewRepository.createReview(uuid, Number(shopId), content);

    // 이미지가 존재할 경우에만 처리
    if (imageUrls.length > 0) {
      // Image 엔티티 생성 및 저장
      const images = await Promise.all(
        imageUrls.map(async (url) => {
          const image = await this.reviewRepository.createImage(url);
          await this.reviewRepository.saveImage(image);
          return image;
        }),
      );

      // Review와 Image 연결
      review.images = images;
    }

    await this.reviewRepository.saveReview(review);
  }
  async updateReview(uuid: string, updateReviewDto: UpdateReviewDto, newFiles?: Express.Multer.File[]) {
    const { reviewId, content, deleteImages } = updateReviewDto;

    // Review 찾기
    const review = await this.reviewRepository.findReviewByReviewId(uuid, reviewId);
    if (!review) {
      throw new NotFoundException('찾을 수 없는 리뷰');
    }
    // 제거할 이미지가 존재하면 삭제
    if (deleteImages?.length > 0) {
      await Promise.all(
        deleteImages.map(async (data) => {
          await this.reviewRepository.deleteImage(data);
        }),
      );

      // 기존 이미지에서 삭제된 이미지를 필터링하여 남겨둠
      review.images = review.images.filter((image) => !deleteImages.some((del) => del == image.id));
    }

    // 새 파일이 존재하면 업로드 후 기존 이미지와 병합
    if (newFiles?.length > 0) {
      // 이미지 업로드 및 URL 생성 (파일이 없을 경우 빈 배열 반환)
      const imageUrls = await this.awsService.uploadImagesToS3(newFiles, 'jpg');

      const images = await Promise.all(
        imageUrls.map(async (url) => {
          const image = await this.reviewRepository.createImage(url);
          await this.reviewRepository.saveImage(image);
          return image;
        }),
      );

      // 기존 이미지 + 새 이미지 병합
      review.images = [...review.images, ...images];
    }

    // 리뷰 글을 수정했을 경우 업데이트
    if (content) {
      review.content = content;
    }

    return await this.reviewRepository.saveReview(review);
  }

  async deleteReviewByUUID(uuid: string, deleteReviewDto: DeleteReviewDto) {
    const { reviewId } = deleteReviewDto;

    const review = await this.reviewRepository.findReviewByReviewId(uuid, reviewId);
    if (!review) throw new NotFoundException('존재하지 않는 리뷰ID 입니다.');

    if (review.images.length > 0) {
      await Promise.all(
        review.images.map(async (data) => {
          await this.reviewRepository.deleteImage(data.id);
        }),
      );
    }
    await this.reviewRepository.removeReview(review);
  }

  async findShopReviewsByShopId(shopId: number, uuid: string) {
    const reviews = await this.reviewRepository.findShopReviewsByShopId(shopId);
    console.log(reviews);
    const userReviews = reviews.filter((review) => review.user?.uuid === uuid);
    const otherReviews = reviews.filter((review) => review.user?.uuid != uuid);
    const deletedUserReviews = reviews.filter((review) => review.user == null);
    return {
      userReviews,
      otherReviews,
      deletedUserReviews,
    };
  }
}
