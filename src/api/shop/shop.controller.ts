import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiOkResponse, getSchemaPath, ApiExtraModels } from '@nestjs/swagger';
import { ShopService } from './shop.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { GetSearchPageShopDTO, GetShopByShopIdDTO, GetShopWithin1KmDTO, ShopSearchPageNationResultDTO } from './dto/paging.dto';
import { GetUUID } from '../../common/deco/get-user.deco';
import { OptionalAuthGuard } from 'src/common/gurad/optional-auth-guard.guard';
import { ShopDetailResponseDTO, ShopRegionDTO, ShopWithin1KmResponseItemDTO } from './dto/response.dto';

@ApiTags('Shop')
@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get('/')
  @UseGuards(OptionalAuthGuard)
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

  @Get('/region')
  @ApiOperation({
    summary: '전체 지역 조회',
    description: '소품샵이 있는 모든 지역을 조회합니다.',
  })
  @ApiExtraModels(SuccessResponseDTO, ShopRegionDTO)
  @ApiOkResponse({
    description: '지역 목록 조회 성공',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDTO) },
        {
          properties: {
            result: {
              type: 'array',
              items: { $ref: getSchemaPath(ShopRegionDTO) },
            },
          },
        },
      ],
    },
  })
  async getAllShopRegion() {
    return new SuccessResponseDTO(await this.shopService.findAllShopRegion());
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
  @ApiBearerAuth('JWT-auth')
  async getShopByShopId(@Param() getShopByShopIdDTO: GetShopByShopIdDTO, @GetUUID() uuid: string) {
    return new SuccessResponseDTO(await this.shopService.findShopByShopId(getShopByShopIdDTO, uuid));
  }
}
