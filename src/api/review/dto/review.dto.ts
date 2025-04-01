import { IsNotEmpty, IsNumber, IsString, Matches, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class PostReviewDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  shopId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(/^[^\x00-\x1F\x7F]*$/, {
    message: '제어 문자를 포함할 수 없습니다.',
  })
  @Matches(/^(?!.*(<script|<\/script>|<iframe|on\w+=|javascript:|eval\()).*$/i, {
    message: '스크립트 또는 악성 코드를 포함할 수 없습니다.',
  })
  content: string;
}

export class UpdateReviewDto {
  @IsNotEmpty()
  reviewId: number;

  @MaxLength(100)
  @Matches(/^[^\x00-\x1F\x7F]*$/, {
    message: '제어 문자를 포함할 수 없습니다.',
  })
  @Matches(/^(?!.*(<script|<\/script>|<iframe|on\w+=|javascript:|eval\()).*$/i, {
    message: '스크립트 또는 악성 코드를 포함할 수 없습니다.',
  })
  content?: string;

  deleteImages?: number[];
}

export class DeleteReviewDto {
  @IsNotEmpty()
  reviewId: number;
}
