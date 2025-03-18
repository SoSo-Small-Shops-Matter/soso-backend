import { IsNotEmpty, IsNumber } from 'class-validator';

export class ShopReportDto {
  @IsNotEmpty()
  @IsNumber()
  shopId: number;

  @IsNotEmpty()
  @IsNumber()
  status: number;

  message?: string;
}
