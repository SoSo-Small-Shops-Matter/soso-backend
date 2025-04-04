import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { Success201ResponseDTO } from '../../common/response/response.dto';
import { ReviewReportDto } from './dto/review-report.dto';
import { AuthGuard } from '@nestjs/passport';
import { ShopReportDto } from './dto/shop-report.dto';

@Controller('report')
@UseGuards(AuthGuard('jwt'))
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('/review')
  async reviewReport(@Req() req, @Body() reviewReportDto: ReviewReportDto) {
    const { uuid } = req.user;
    await this.reportService.reportReview(uuid, reviewReportDto);
    return new Success201ResponseDTO();
  }

  @Post('/shop')
  async shopReport(@Req() req, @Body() shopReportDto: ShopReportDto) {
    const { uuid } = req.user;
    await this.reportService.reportShop(uuid, shopReportDto);
    return new Success201ResponseDTO();
  }
}
