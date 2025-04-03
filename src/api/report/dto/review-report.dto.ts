import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class ReviewReportDto {
  @IsNotEmpty()
  @IsNumber()
  reviewId: number;

  @IsNotEmpty()
  @IsNumber()
  status: number;

  // @MaxLength(100)
  message?: string;
}
