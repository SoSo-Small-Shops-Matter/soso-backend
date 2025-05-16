import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ShopService } from './shop.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { GetSearchPageShopDTO, GetShopWithin1KmDTO } from './dto/paging.dto';
import { GetUUID } from '../../common/deco/get-user.deco';
import { OptionalAuthGuard } from 'src/common/gurad/optional-auth-guard.guard';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get('/')
  @UseGuards(OptionalAuthGuard)
  async getShopWithin1Km(@Query() getShopWithin1KmDTO: GetShopWithin1KmDTO, @GetUUID() uuid: string) {
    return new SuccessResponseDTO(await this.shopService.findShopsWithin1Km(getShopWithin1KmDTO, uuid));
  }

  @Get('/search')
  async getSearchPageShop(@Query() getSearchPageShopDTO: GetSearchPageShopDTO) {
    return new SuccessResponseDTO(await this.shopService.findShopsByKeyword(getSearchPageShopDTO));
  }

  @Get('/region')
  async getAllShopRegion() {
    return new SuccessResponseDTO(await this.shopService.findAllShopRegion());
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

  @Get('/temp')
  async getTemp() {
    return new SuccessResponseDTO(await this.shopService.findTemp());
  }
}
