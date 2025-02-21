import { IsInt, IsNotEmpty, IsString } from 'class-validator';

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
}

export class DeleteReviewDto {
  @IsNotEmpty()
  reviewId: number;
}
