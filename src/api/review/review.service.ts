import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { ReportRepository } from '../report/report.repository';
import { ReviewReportDto } from './dto/review-report.dto';

@Injectable()
export class ReviewService {
  constructor(
    private reportRepository: ReportRepository,
    private reviewRepository: ReviewRepository,
  ) {}

  async reportReview(uuid: string, reviewReportDto: ReviewReportDto): Promise<void> {
    const { reviewId, status, message } = reviewReportDto;
    const review = await this.reviewRepository.findOneReviewById(reviewId);
    if (!review) throw new NotFoundException('Not exist review');

    const existData = await this.reportRepository.findReviewReport(uuid, review.id);
    if (existData) throw new ConflictException('Exist Report Review');

    await this.reportRepository.saveReviewReport(uuid, review.id, status, message);
  }
}
