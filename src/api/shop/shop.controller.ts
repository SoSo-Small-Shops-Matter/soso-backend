import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ShopService } from './shop.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { GetSearchPageShopDTO, GetShopWithin1KmDTO } from './dto/paging.dto';
import { GetUUID } from '../../common/deco/get-user.deco';
import { OptionalAuthGuard } from 'src/common/gurad/optional-auth-guard.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PostReviewDto, UpdateReviewDto } from './dto/review.dto';
import { ShopReportDto } from './dto/shop-report.dto';
import { SubmitNewShopDto, SubmitShopOperatingHoursDto } from './dto/submit.dto';

@Controller('shops')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get('/')
  @UseGuards(OptionalAuthGuard)
  async getShopWithin1Km(@Query() getShopWithin1KmDTO: GetShopWithin1KmDTO, @GetUUID() uuid: string) {
    return new SuccessResponseDTO(await this.shopService.findShopsWithin1Km(getShopWithin1KmDTO, uuid));
  }

  @Post('/')
  async submitNewShop(@Body() newShopData: SubmitNewShopDto, @GetUUID() uuid: string) {
    return new SuccessResponseDTO(await this.shopService.createNewShop(newShopData, uuid));
  }

  @Get('/search')
  async getSearchPageShop(@Query() getSearchPageShopDTO: GetSearchPageShopDTO) {
    return new SuccessResponseDTO(await this.shopService.findShopsByKeyword(getSearchPageShopDTO));
  }

  @Get('/temp')
  async getTemp() {
    return new SuccessResponseDTO(await this.shopService.findTemp());
  }

  @Get('/:shopId')
  @UseGuards(OptionalAuthGuard)
  async getShopByShopId(
    // 파라미터로 들어오는 shopId는 String 타입인데, 이를 Number로 사용하기 위해 강제 형변환을 시킴
    @Param('shopId', ParseIntPipe) shopId: number,
    @GetUUID() uuid: string,
  ) {
    return new SuccessResponseDTO(await this.shopService.findShopByShopId(shopId, uuid));
  }

  @Post('/:shopId/reviews')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: { fileSize: 5 * 1024 * 1024 }, // 최대 5MB
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) cb(null, true);
        else cb(new Error('Only images allowed!'), false);
      },
    }),
  )
  async postReview(@Body() postReviewDto: PostReviewDto, @GetUUID() uuid: string, @UploadedFiles() files?: Express.Multer.File[]) {
    return new SuccessResponseDTO(await this.shopService.createReview(uuid, postReviewDto, files));
  }

  @Post('/:shopId/reports')
  async shopReport(@GetUUID() uuid: string, @Body() shopReportDto: ShopReportDto) {
    return new SuccessResponseDTO(await this.shopService.reportShop(uuid, shopReportDto));
  }

  @Post('/:shopId/operating')
  async submitShopOperatingHours(@Body() operatingData: SubmitShopOperatingHoursDto, @GetUUID() uuid: string) {
    return new SuccessResponseDTO(await this.shopService.validateAndUpdateOperatingHours(operatingData, uuid));
  }

  @Post('/:shopId/products')
  async submitProducts(@Body() products: any, @GetUUID() uuid: string) {
    return new SuccessResponseDTO(await this.shopService.validateAndUpdateProducts(products, uuid));
  }

  @Patch('/:shopId/reviews/:reviewId')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: { fileSize: 5 * 1024 * 1024 }, // 최대 5MB
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) cb(null, true);
        else cb(new Error('Only images allowed!'), false);
      },
    }),
  )
  async updateReview(
    @Param('reviewId') reviewId: number,
    @Param('shopId') shopId: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @GetUUID() uuid: string,
    @UploadedFiles() newFiles?: Express.Multer.File[],
  ) {
    return new SuccessResponseDTO(await this.shopService.updateReview(uuid, reviewId, shopId, updateReviewDto, newFiles));
  }

  @Delete('/:shopId/reviews/:reviewId')
  async deleteReview(@Param('reviewId') reviewId: number, @Param('shopId') shopId: number, @GetUUID() uuid: string) {
    return new SuccessResponseDTO(await this.shopService.deleteReviewByUUID(uuid, reviewId, shopId));
  }
}
