import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiOkResponse, getSchemaPath, ApiExtraModels } from '@nestjs/swagger';
import { ShopService } from './shop.service';
import { SuccessNoResultResponseDTO, SuccessResponseDTO } from 'src/common/response/response.dto';
import { GetSearchPageShopDTO, ParamShopIdDTO, GetShopWithin1KmDTO, ShopSearchPageNationResultDTO } from './dto/paging.dto';
import { GetUUID } from '../../common/deco/get-user.deco';
import { OptionalAuthGuard } from 'src/common/gurad/optional-auth-guard.guard';
import { ShopDetailResponseDTO, ShopWithin1KmResponseItemDTO } from './dto/response.dto';
import { SubmitNewProductsDto, SubmitNewShopDto, SubmitShopOperatingHoursDto } from './dto/submit.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

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
}
