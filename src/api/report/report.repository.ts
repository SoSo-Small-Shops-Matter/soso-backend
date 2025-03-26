import { InjectRepository } from '@nestjs/typeorm';
import { ReviewReport } from '../../database/entity/review-report.entity';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { ShopReport } from '../../database/entity/shop-report.entity';
import { LoggerService } from '../logger/logger.service';

export class ReportRepository {
  constructor(
    @InjectRepository(ReviewReport)
    private readonly reviewReportRepository: Repository<ReviewReport>,

    @InjectRepository(ShopReport)
    private readonly shopReportRepository: Repository<ShopReport>,

    private readonly loggerService: LoggerService,
  ) {}

  async findReviewReport(uuid: string, reviewId: number) {
    try {
      return await this.reviewReportRepository.findOne({
        where: {
          user: uuid,
          reviewId,
        },
      });
    } catch (err) {
      this.loggerService.warn(`Report/ findReviewReport Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async saveReviewReport(uuid: string, reviewId: number, status: number, message: string | null = null) {
    try {
      return await this.reviewReportRepository.save({
        user: uuid,
        reviewId,
        status,
        message,
      });
    } catch (err) {
      this.loggerService.warn(`Report/ saveReviewReport Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async findShopReport(uuid: string, shopId: number) {
    try {
      return await this.shopReportRepository.findOne({
        where: {
          user: uuid,
          shopId,
        },
      });
    } catch (err) {
      this.loggerService.warn(`Report/findShopReport Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async saveShopReport(uuid: string, shopId: number, status: number, message: string | null = null) {
    try {
      return await this.shopReportRepository.save({
        user: uuid,
        shopId,
        status,
        message,
      });
    } catch (err) {
      this.loggerService.warn(`Report/ saveShopReport Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }
}
