import { Body, Controller, Get, Param, Patch, Query, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ShopService } from './shop.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { ShopIdParamDto, UpdateShopProductsDto } from './dto/submit.dto';
import { AuthGuard } from '@nestjs/passport';
import { OptionalAuthGuard } from 'src/common/gurad/optional-auth-guard.guard';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get('/')
  async getShopWithin1Km(@Query('lat') lat: number, @Query('lng') lng: number, @Query('sorting') sorting: string) {
    return new SuccessResponseDTO(await this.shopService.findShopsWithin1Km(lat, lng, sorting));
  }

  @Patch('/')
  @UseGuards(AuthGuard('jwt'))
  async updateShopProduct(@Body() updateShopProductsDto: UpdateShopProductsDto, @Req() req: any) {
    const { uuid } = req.user;
    return new SuccessResponseDTO(await this.shopService.updateShopProduct(updateShopProductsDto, uuid));
  }

  @Get('/search')
  async getSearchPageShop(@Query('page') page: number, @Query('limit') limit: number, @Query('keyword') keyword: string) {
    return new SuccessResponseDTO(await this.shopService.findShopsByKeyword(keyword, page, limit));
  }

  @Patch('/report')
  @UseGuards(AuthGuard('jwt'))
  async reportShop(@Body() body: any) {
    const { report, shopId } = body;
    return new SuccessResponseDTO(await this.shopService.updateShopReportStatus(report, shopId));
  }

  @Get('/region')
  async getAllShopRegion() {
    return new SuccessResponseDTO(await this.shopService.findAllShopRegion());
  }
  @Get('/:shopId')
  @UseGuards(OptionalAuthGuard)
  async getShopByShopId(
    // 파라미터로 들어오는 shopId는 String 타입인데, 이를 Number로 사용하기 위해 강제 형변환을 시킴
    @Param(new ValidationPipe({ transform: true })) params: ShopIdParamDto,
    @Req() req: any,
  ) {
    const { shopId } = params;
    const uuid = req.user ? req.user.uuid : null; // 유저 정보가 있으면 uuid를 사용'
    return new SuccessResponseDTO(await this.shopService.findShopByShopId(shopId, uuid));
  }
}
