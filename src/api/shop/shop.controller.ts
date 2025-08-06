import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiOkResponse,
  getSchemaPath,
  ApiExtraModels,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { ShopService } from './shop.service';
import { SuccessNoResultResponseDTO, SuccessResponseDTO } from 'src/common/response/response.dto';
import { GetSearchPageShopDTO, ParamShopIdDTO, GetShopWithin1KmDTO, ShopSearchPageNationResultDTO } from './dto/paging.dto';
import { GetUUID } from '../../common/deco/get-user.deco';
import { OptionalAuthGuard } from 'src/common/gurad/optional-auth-guard.guard';
import { ShopDetailResponseDTO, ShopWithin1KmResponseItemDTO } from './dto/response.dto';
import { SubmitNewProductsDto, SubmitNewShopDto, SubmitShopOperatingHoursDto } from './dto/submit.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PostReviewDto, ShopIdAndReviewIdParamDTO, UpdateReviewDto } from './dto/review.dto';
import { ShopReportDto } from './dto/shop-report.dto';
import { ReviewReportDto } from './dto/review-report.dto';

@ApiTags('Shops')
@Controller('shops')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get('/')
  @UseGuards(OptionalAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '1km 반경 내 소품샵 조회',
    description: '사용자 위치 기준 1km 반경 내의 소품샵들을 조회합니다. 거리순 또는 인기순으로 정렬할 수 있습니다.',
  })
  @ApiExtraModels(SuccessResponseDTO, ShopWithin1KmResponseItemDTO)
  @ApiOkResponse({
    description: '소품샵 목록 조회 성공',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDTO) },
        {
          properties: {
            result: {
              type: 'array',
              items: { $ref: getSchemaPath(ShopWithin1KmResponseItemDTO) },
            },
          },
        },
      ],
    },
  })
  async getShopWithin1Km(@Query() getShopWithin1KmDTO: GetShopWithin1KmDTO, @GetUUID() uuid: string) {
    return new SuccessResponseDTO(await this.shopService.findShopsWithin1Km(getShopWithin1KmDTO, uuid));
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '새로운 소품샵 제보',
  })
  @ApiOkResponse({
    description: '새로운 소품샵 제보 성공',
    type: SuccessNoResultResponseDTO,
  })
  async submitNewShop(@Body() newShopData: SubmitNewShopDto, @GetUUID() uuid: string) {
    await this.shopService.createNewShop(newShopData, uuid);
    return new SuccessNoResultResponseDTO();
  }

  @Get('/search')
  @ApiOperation({
    summary: '키워드로 소품샵 검색',
    description: '키워드를 사용하여 소품샵을 검색합니다.',
  })
  @ApiExtraModels(SuccessResponseDTO, ShopSearchPageNationResultDTO)
  @ApiOkResponse({
    description: '검색 결과 조회 성공',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDTO) },
        {
          properties: {
            result: {
              $ref: getSchemaPath(ShopSearchPageNationResultDTO),
            },
          },
        },
      ],
    },
  })
  async getSearchPageShop(@Query() getSearchPageShopDTO: GetSearchPageShopDTO) {
    return new SuccessResponseDTO(await this.shopService.findShopsByKeyword(getSearchPageShopDTO));
  }

  @Get('/temp')
  @ApiResponse({
    status: 200,
    description: '임시 데이터 조회 성공',
  })
  async getTemp() {
    return new SuccessResponseDTO(await this.shopService.findTemp());
  }

  @Get('/:shopId')
  @UseGuards(OptionalAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '소품샵 상세 정보 조회',
    description: '특정 소품샵의 상세 정보를 조회합니다.',
  })
  @ApiExtraModels(SuccessResponseDTO, ShopDetailResponseDTO)
  @ApiOkResponse({
    description: '소품샵 상세 정보 조회 성공',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDTO) },
        {
          properties: {
            result: { $ref: getSchemaPath(ShopDetailResponseDTO) },
          },
        },
      ],
    },
  })
  async getShopByShopId(@Param() paramShopIdDTO: ParamShopIdDTO, @GetUUID() uuid: string) {
    return new SuccessResponseDTO(await this.shopService.findShopByShopId(paramShopIdDTO, uuid));
  }

  @Post('/:shopId/operating')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '소품샵 운영정보 제보',
  })
  @ApiOkResponse({
    description: '운영정보 제보 성공',
    type: SuccessNoResultResponseDTO,
  })
  async submitShopOperatingHours(
    @Param() paramShopIdDTO: ParamShopIdDTO,
    @Body() operatingData: SubmitShopOperatingHoursDto,
    @GetUUID() uuid: string,
  ) {
    await this.shopService.validateAndUpdateOperatingHours(paramShopIdDTO, operatingData, uuid);
    return new SuccessNoResultResponseDTO();
  }

  @Post('/:shopId/products')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '소품샵 판매 목록 제보',
  })
  @ApiOkResponse({
    description: '판매 목록 성공',
    type: SuccessNoResultResponseDTO,
  })
  async submitProducts(@Param() paramShopIdDTO: ParamShopIdDTO, @Body() products: SubmitNewProductsDto, @GetUUID() uuid: string) {
    await this.shopService.validateAndUpdateProducts(paramShopIdDTO, products, uuid);
    return new SuccessNoResultResponseDTO();
  }

  @Post('/:shopId/reviews')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: { fileSize: 5 * 1024 * 1024 }, // 최대 5MB
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) cb(null, true);
        else cb(new Error('Only images allowed!'), false);
      },
    }),
  )
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '리뷰 작성', description: '리뷰를 작성합니다.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '리뷰 데이터 및 이미지 파일',
    type: PostReviewDto,
  })
  @ApiOkResponse({
    description: '리뷰 작성 성공',
    type: SuccessNoResultResponseDTO,
  })
  async postReview(
    @Param() paramShopIdDTO: ParamShopIdDTO,
    @Body() postReviewDto: PostReviewDto,
    @GetUUID() uuid: string,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    await this.shopService.createReview(uuid, postReviewDto, paramShopIdDTO, files);
    return new SuccessNoResultResponseDTO();
  }

  @Patch('/:shopId/reviews/:reviewId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: { fileSize: 5 * 1024 * 1024 }, // 최대 5MB
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) cb(null, true);
        else cb(new Error('Only images allowed!'), false);
      },
    }),
  )
  @ApiOperation({ summary: '리뷰 수정', description: '리뷰를 수정합니다.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '리뷰 데이터 및 이미지 파일',
    type: UpdateReviewDto,
  })
  @ApiOkResponse({
    description: '리뷰 수정 성공',
    type: SuccessNoResultResponseDTO,
  })
  async updateReview(
    @Param() shopIdAndReviewIdParamDTO: ShopIdAndReviewIdParamDTO,
    @Body() updateReviewDto: UpdateReviewDto,
    @GetUUID() uuid: string,
    @UploadedFiles() newFiles?: Express.Multer.File[],
  ) {
    await this.shopService.updateReview(uuid, updateReviewDto, shopIdAndReviewIdParamDTO, newFiles);
    return new SuccessNoResultResponseDTO();
  }

  @Delete('/:shopId/reviews/:reviewId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: '리뷰 삭제', description: '리뷰를 삭제합니다.' })
  @ApiOkResponse({
    description: '리뷰 삭제 성공',
    type: SuccessNoResultResponseDTO,
  })
  async deleteReview(@Param() shopIdAndReviewIdParamDTO: ShopIdAndReviewIdParamDTO, @GetUUID() uuid: string) {
    await this.shopService.deleteReviewByUUID(uuid, shopIdAndReviewIdParamDTO);
    return new SuccessNoResultResponseDTO();
  }

  @Post('/:shopId/shop/report')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '소품샵 신고',
    description: 'status => 0: 더 이상 운영하지 않은 가게 / 1: 위치가 잘못됨 ',
  })
  @ApiOkResponse({
    description: '소품샵 신고 성공',
    type: SuccessNoResultResponseDTO,
  })
  async shopReport(@Param() paramShopIdDTO: ParamShopIdDTO, @GetUUID() uuid: string, @Body() shopReportDto: ShopReportDto) {
    await this.shopService.reportShop(uuid, shopReportDto, paramShopIdDTO);
    return new SuccessNoResultResponseDTO();
  }

  @Post('/:shopId/reviews/:reviewId/report')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: '리뷰 신고',
    description:
      'status => 0: 관련 없는 후기 / 1: 음란, 욕설 등 부적절한 내용 / 2: 개인정보 노출 / 3: 홍보 및 광고 후기 / 4: 같은 내용 도배 / 5: 기타 ',
  })
  @ApiOkResponse({
    description: '리뷰 신고 성공',
    type: SuccessNoResultResponseDTO,
  })
  async reviewReport(
    @Param() shopIdAndReviewIdParamDTO: ShopIdAndReviewIdParamDTO,
    @GetUUID() uuid: string,
    @Body() reviewReportDto: ReviewReportDto,
  ) {
    await this.shopService.reportReview(uuid, reviewReportDto, shopIdAndReviewIdParamDTO);
    return new SuccessNoResultResponseDTO();
  }
}
