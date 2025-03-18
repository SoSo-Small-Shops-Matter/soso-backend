import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReviewReportDto {
  @IsNotEmpty()
  @IsNumber()
  reviewId: number;

  @IsNotEmpty()
  @IsNumber()
  status: number;

  message?: string;
}
