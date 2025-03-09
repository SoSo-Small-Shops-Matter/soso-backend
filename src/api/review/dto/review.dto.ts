import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PostReviewDto {
  // @IsInt()
  @IsNotEmpty()
  shopId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class UpdateReviewDto {
  @IsNotEmpty()
  reviewId: number;

  content?: string;

  deleteImages?: number[];
}

export class DeleteReviewDto {
  @IsNotEmpty()
  reviewId: number;
}
