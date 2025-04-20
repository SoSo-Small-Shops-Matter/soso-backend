import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReviewReportDto } from './dto/review-report.dto';
import { ShopReportDto } from './dto/shop-report.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GetUUID } from '../../common/deco/get-user.deco';
import { SuccessResponseDTO } from '../../common/response/response.dto';

@Controller('report')
@UseGuards(JwtAuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('/review')
  async reviewReport(@GetUUID() uuid: string, @Body() reviewReportDto: ReviewReportDto) {
    return new SuccessResponseDTO(await this.reportService.reportReview(uuid, reviewReportDto));
  }

  @Post('/shop')
  async shopReport(@GetUUID() uuid: string, @Body() shopReportDto: ShopReportDto) {
    return new SuccessResponseDTO(await this.reportService.reportShop(uuid, shopReportDto));
  }
}
