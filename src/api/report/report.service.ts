import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ReportRepository } from './report.repository';
import { ReviewReportDto } from './dto/review-report.dto';
import { ReviewRepository } from '../review/review.repository';
import { ShopReportDto } from './dto/shop-report.dto';
import { ShopRepository } from '../shop/shop.repository';

@Injectable()
export class ReportService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly reviewRepository: ReviewRepository,
    private readonly shopRepository: ShopRepository,
  ) {}

  async reportReview(uuid: string, reviewReportDto: ReviewReportDto) {
    const { reviewId, status, message } = reviewReportDto;
    const review = await this.reviewRepository.findOneReviewById(reviewId);
    if (!review) throw new NotFoundException('Not exist review');

    const existData = await this.reportRepository.findReviewReport(uuid, review.id);
    if (existData) throw new ConflictException('Exist Report Review');

    return await this.reportRepository.saveReviewReport(uuid, review.id, status, message);
  }

  async reportShop(uuid: string, shopReportDto: ShopReportDto) {
    const { shopId, status, message } = shopReportDto;
    const shop = await this.shopRepository.findOnlyShopByShopId(shopId);
    if (!shop) throw new NotFoundException('Not exist shop');

    const existData = await this.reportRepository.findShopReport(uuid, shop.id);
    if (existData) throw new ConflictException('Exist Report Shop');

    return await this.reportRepository.saveShopReport(uuid, shop.id, status, message);
  }
}
