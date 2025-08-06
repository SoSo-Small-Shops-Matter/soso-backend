import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OperatingHoursDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  type?: number;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  startTime: string;

  @IsOptional()
  @IsString()
  endTime: string;

  @IsOptional()
  @IsBoolean()
  monday?: boolean;

  @IsOptional()
  @IsBoolean()
  tuesday?: boolean;

  @IsOptional()
  @IsBoolean()
  wednesday?: boolean;

  @IsOptional()
  @IsBoolean()
  thursday?: boolean;

  @IsOptional()
  @IsBoolean()
  friday?: boolean;

  @IsOptional()
  @IsBoolean()
  saturday?: boolean;

  @IsOptional()
  @IsBoolean()
  sunday?: boolean;
}

export class SubmitShopOperatingHoursDto {
  @IsInt()
  @IsNotEmpty()
  shopId: number;

  @IsNotEmpty()
  operatingHours: OperatingHoursDto;
}

export class SubmitNewShopDto {
  @IsNotEmpty()
  shop: SubmitShop;

  operatingHours?: OperatingHoursDto;

  products?: Products[];
}

export class SubmitNewProductsDto {
  @IsNotEmpty()
  shopId: number;

  @IsNotEmpty()
  products?: Products[];
}

export interface SubmitShop {
  name: string;

  lat: number;

  lng: number;

  location: string;
}

export interface Products {
  id: number;
}
