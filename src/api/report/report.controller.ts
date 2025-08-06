import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReviewReportDto } from './dto/review-report.dto';
import { ShopReportDto } from './dto/shop-report.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GetUUID } from '../../common/deco/get-user.deco';
import { SuccessNoResultResponseDTO, SuccessResponseDTO } from '../../common/response/response.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Report')
@ApiBearerAuth('JWT-auth')
@Controller('report')
@UseGuards(JwtAuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('/review')
  @ApiOperation({
    summary: '리뷰 신고',
    description:
      'status => 0: 관련 없는 후기 / 1: 음란, 욕설 등 부적절한 내용 / 2: 개인정보 노출 / 3: 홍보 및 광고 후기 / 4: 같은 내용 도배 / 5: 기타 ',
  })
  @ApiOkResponse({
    description: '리뷰 신고 성공',
    type: SuccessNoResultResponseDTO,
  })
  async reviewReport(@GetUUID() uuid: string, @Body() reviewReportDto: ReviewReportDto) {
    return new SuccessResponseDTO(await this.reportService.reportReview(uuid, reviewReportDto));
  }

  @Post('/shop')
  @ApiOperation({
    summary: '소품샵 신고',
    description: 'status => 0: 더 이상 운영하지 않은 가게 / 1: 위치가 잘못됨 ',
  })
  @ApiOkResponse({
    description: '소품샵 신고 성공',
    type: SuccessNoResultResponseDTO,
  })
  async shopReport(@GetUUID() uuid: string, @Body() shopReportDto: ShopReportDto) {
    return new SuccessResponseDTO(await this.reportService.reportShop(uuid, shopReportDto));
  }
}
