import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ShopSearchResultItemDTO } from './response.dto';

export class GetShopWithin1KmDTO {
  @ApiProperty({ description: '위도', example: 37.5665 })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  lat: number;

  @ApiProperty({ description: '경도', example: 127 })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  lng: number;

  @ApiProperty({ description: '정렬 방식 (true: 거리순, false: 인기순)', example: true })
  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  sorting: boolean;

  @ApiPropertyOptional({ description: '위시리스트 필터링', example: 'true' })
  @IsString()
  @IsOptional()
  isWishlist?: string;

  @ApiPropertyOptional({ description: '상품 ID 배열로 필터링', example: [1, 2, 3], type: [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @Type(() => Number)
  productIds?: number[];
}

export class GetSearchPageShopDTO {
  @ApiProperty({ description: '위도', example: 37.5665 })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  lat: number;

  @ApiProperty({ description: '경도', example: 126.978 })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  lng: number;

  @ApiProperty({ description: '페이지당 항목 수', example: 10 })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  limit: number;

  @ApiProperty({ description: '페이지 번호', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  page: number;

  @ApiProperty({ description: '검색 키워드', example: '소품샵' })
  @IsString()
  @IsNotEmpty()
  keyword: string;
}

export class Paging {
  @ApiProperty({ description: '현재 페이지', example: 1 })
  page: number;

  @ApiProperty({ description: '페이지당 항목 수', example: 10 })
  limit: number;

  @ApiProperty({ description: '전체 항목 수', example: 100 })
  totalElements: number;

  @ApiProperty({ description: '전체 페이지 수', example: 10 })
  totalPages: number;

  @ApiProperty({ description: '다음 페이지 존재 여부', example: true })
  nextPage: boolean;

  constructor(page: number, limit: number, totalElements: number, totalPages: number, nextPage: boolean) {
    this.page = page;
    this.limit = limit;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
    this.nextPage = nextPage;
  }
}

export class ResponsePageNationDTO<T> {
  @ApiProperty({ description: '데이터 배열' })
  data: T[];

  @ApiProperty({ description: '페이지 정보', type: Paging })
  pageInfo: Paging;

  constructor(data: T[], pageInfo: Paging) {
    this.data = data;
    this.pageInfo = pageInfo;
  }
}

export class ShopSearchPageNationResultDTO extends ResponsePageNationDTO<ShopSearchResultItemDTO> {
  @ApiProperty({ type: [ShopSearchResultItemDTO] })
  data: ShopSearchResultItemDTO[];

  @ApiProperty({ type: Paging })
  pageInfo: Paging;
}

export class ParamShopIdDTO {
  @ApiProperty({ description: '소품샵 Id', example: 132 })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  shopId: number;
}
