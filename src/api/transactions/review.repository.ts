import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { LoggerService } from '../logger/logger.service';
import { Review } from '../../database/entity/review.entity';
import { Image } from '../../database/entity/image.entity';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class ReviewTransactionsRepository {
  constructor(
    private dataSource: DataSource,
    private loggerService: LoggerService,
    private awsService: AwsService,
  ) {}

  async createReview(uuid: string, shopId: number, content: string, imageUrls: string[]): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const reviewRepo = queryRunner.manager.getRepository(Review);
      const imageRepo = queryRunner.manager.getRepository(Image);

      // Review 생성
      const review = await reviewRepo.save({
        content,
        user: { uuid },
        shop: { id: shopId },
      });

      // 이미지가 존재할 경우에만 처리
      if (imageUrls.length > 0) {
        // Image 엔티티 생성 및 저장
        const images = await Promise.all(
          imageUrls.map(async (url) => {
            const image = await imageRepo.save({ url });
            return image;
          }),
        );

        // Review와 Image 연결
        review.images = images;
        await reviewRepo.save(review);
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      this.loggerService.warn(`Review/ CreateReview Error: ${err}`);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  async updateReview(uuid: string, reviewId: number, content: string, deleteImages: number[], newImageUrls: string[]): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const reviewRepo = queryRunner.manager.getRepository(Review);
      const imageRepo = queryRunner.manager.getRepository(Image);

      // Review 찾기
      const review = await reviewRepo.findOne({
        where: { id: reviewId, user: { uuid } },
        relations: ['images'],
      });

      if (!review) {
        throw new NotFoundException('No Found Review');
      }

      // 제거할 이미지가 존재하면 삭제
      if (deleteImages?.length > 0) {
        // S3에서 이미지 삭제
        const imagesToDelete = review.images.filter(image => deleteImages.includes(image.id));
        for (const image of imagesToDelete) {
          await this.awsService.deleteImageFromS3(image.url);
        }
        // DB에서 이미지 삭제
        await imageRepo.delete(deleteImages);
        review.images = review.images.filter((image) => !deleteImages.includes(image.id));
      }

      // 새 이미지가 존재하면 추가
      if (newImageUrls.length > 0) {
        const newImages = await Promise.all(
          newImageUrls.map(async (url) => {
            const image = await imageRepo.save({ url });
            return image;
          }),
        );
        review.images = [...review.images, ...newImages];
      }

      // 리뷰 내용 업데이트
      if (content) {
        review.content = content;
      }

      await reviewRepo.save(review);
      await queryRunner.commitTransaction();
    } catch (err) {
      this.loggerService.warn(`Review/ UpdateReview Error: ${err}`);
      await queryRunner.rollbackTransaction();
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  async deleteReview(uuid: string, reviewId: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const reviewRepo = queryRunner.manager.getRepository(Review);
      const imageRepo = queryRunner.manager.getRepository(Image);

      // Review 찾기
      const review = await reviewRepo.findOne({
        where: { id: reviewId, user: { uuid } },
        relations: ['images'],
      });

      if (!review) {
        throw new NotFoundException('Not Found ReviewId');
      }

      // 이미지가 존재하면 S3와 DB에서 삭제
      if (review.images.length > 0) {
        // S3에서 이미지 삭제
        for (const image of review.images) {
          await this.awsService.deleteImageFromS3(image.url);
        }
        // DB에서 이미지 삭제
        await imageRepo.delete(review.images.map(image => image.id));
      }

      // 리뷰 삭제
      await reviewRepo.remove(review);

      await queryRunner.commitTransaction();
    } catch (err) {
      this.loggerService.warn(`Review/ DeleteReview Error: ${err}`);
      await queryRunner.rollbackTransaction();
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }
} 