import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class PostReviewDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  shopId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  content: string;
}

export class UpdateReviewDto {
  @IsNotEmpty()
  reviewId: number;

  @MaxLength(100)
  content?: string;

  deleteImages?: number[];
}

export class DeleteReviewDto {
  @IsNotEmpty()
  reviewId: number;
}
