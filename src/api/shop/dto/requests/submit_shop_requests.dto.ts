import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OperatingHoursDto {
  @ApiPropertyOptional({ description: '연락처', example: '010-1234-5678' })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiPropertyOptional({ description: '시작 시간 (HH:mm)', example: '09:00' })
  @IsOptional()
  @IsString()
  startTime: string;

  @ApiPropertyOptional({ description: '종료 시간 (HH:mm)', example: '18:00' })
  @IsOptional()
  @IsString()
  endTime: string;

  @ApiPropertyOptional({ description: '월요일 운영 여부', example: true })
  @IsOptional()
  @IsBoolean()
  monday?: boolean;

  @ApiPropertyOptional({ description: '화요일 운영 여부', example: true })
  @IsOptional()
  @IsBoolean()
  tuesday?: boolean;

  @ApiPropertyOptional({ description: '수요일 운영 여부', example: true })
  @IsOptional()
  @IsBoolean()
  wednesday?: boolean;

  @ApiPropertyOptional({ description: '목요일 운영 여부', example: true })
  @IsOptional()
  @IsBoolean()
  thursday?: boolean;

  @ApiPropertyOptional({ description: '금요일 운영 여부', example: true })
  @IsOptional()
  @IsBoolean()
  friday?: boolean;

  @ApiPropertyOptional({ description: '토요일 운영 여부', example: false })
  @IsOptional()
  @IsBoolean()
  saturday?: boolean;

  @ApiPropertyOptional({ description: '일요일 운영 여부', example: false })
  @IsOptional()
  @IsBoolean()
  sunday?: boolean;
}

export class SubmitShopOperatingHoursDto {
  @ApiProperty({ description: '운영 시간 정보' })
  @IsNotEmpty()
  operatingHours: OperatingHoursDto;
}

export class SubmitShop {
  @ApiProperty({ description: '소품샵 이름', example: '소소한 상점' })
  name: string;

  @ApiProperty({ description: '위도', example: 37.123456 })
  lat: number;

  @ApiProperty({ description: '경도', example: 127.123456 })
  lng: number;

  @ApiProperty({ description: '주소 정보', example: '서울시 성동구 어딘가 123-4' })
  location: string;
}

export class Products {
  @ApiProperty({ description: '제품 ID', example: 1 })
  id: number;
}

export class SubmitNewShopDto {
  @ApiProperty({ description: '소품샵 정보' })
  @IsNotEmpty()
  shop: SubmitShop;

  @ApiPropertyOptional({ description: '운영 시간 정보' })
  operatingHours?: OperatingHoursDto;

  @ApiPropertyOptional({ description: '판매 제품 리스트', type: [Products] })
  products?: Products[];
}

export class SubmitNewProductsDto {
  @ApiProperty({ description: '소품샵 ID', example: 1 })
  @IsNotEmpty()
  shopId: number;

  @ApiProperty({ description: '제품 리스트', type: [Products] })
  @IsNotEmpty()
  products?: Products[];
}
