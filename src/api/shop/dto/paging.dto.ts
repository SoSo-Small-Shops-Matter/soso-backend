import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
