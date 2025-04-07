import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReviewReportDto } from './dto/review-report.dto';
import { ShopReportDto } from './dto/shop-report.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('report')
@UseGuards(JwtAuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('/review')
  @HttpCode(HttpStatus.NO_CONTENT)
  async reviewReport(@Req() req, @Body() reviewReportDto: ReviewReportDto) {
    const { uuid } = req.user;
    await this.reportService.reportReview(uuid, reviewReportDto);
  }

  @Post('/shop')
  @HttpCode(HttpStatus.NO_CONTENT)
  async shopReport(@Req() req, @Body() shopReportDto: ShopReportDto) {
    const { uuid } = req.user;
    await this.reportService.reportShop(uuid, shopReportDto);
  }
}
