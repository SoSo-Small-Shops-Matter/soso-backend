import { Body, Controller, Post } from '@nestjs/common';
import { GetUUID } from 'src/common/deco/get-user.deco';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { ReviewReportDto } from './dto/review-report.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('/:reviewId/reports')
  async reviewReport(@GetUUID() uuid: string, @Body() reviewReportDto: ReviewReportDto) {
    return new SuccessResponseDTO(await this.reviewService.reportReview(uuid, reviewReportDto));
  }
}
