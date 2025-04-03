import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class ShopReportDto {
  @IsNotEmpty()
  @IsNumber()
  shopId: number;

  @IsNotEmpty()
  @IsNumber()
  status: number;

  // @MaxLength(100)
  message?: string;
}
