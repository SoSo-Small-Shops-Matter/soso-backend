import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetShopWithin1KmDTO {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number) // 문자열 → 숫자 변환
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  lng: number;

  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean) // 'true'/'false' → boolean 변환
  sorting: boolean;

  @IsString()
  @IsOptional()
  isWishlist?: string;
}

export class GetSearchPageShopDTO {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  limit: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  page: number;

  @IsString()
  @IsNotEmpty()
  keyword: string;
}

export class Paging {
  page: number;
  limit: number;
  totalElements: number;
  totalPages: number;
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
  data: T[];
  pageInfo: Paging;

  constructor(data: T[], pageInfo: Paging) {
    this.data = data;
    this.pageInfo = pageInfo;
  }
}
