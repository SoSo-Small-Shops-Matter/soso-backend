import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PostReviewDto {
  @ApiProperty({ description: '리뷰 내용', example: '정말 예쁜 소품들이 많아요!' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({
    description: '업로드할 이미지 파일들 (최대 10개)',
    type: 'string',
    format: 'binary',
    isArray: true,
  })
  files?: any;
}

export class UpdateReviewDto {
  @ApiPropertyOptional({ description: '수정할 리뷰 내용 (최대 100자)', example: '너무 예뻐서 또 방문하고 싶어요!', maxLength: 100 })
  @MaxLength(100)
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description: '삭제할 이미지 ID 배열',
    example: [1, 2],
    type: [Number],
  })
  @IsOptional()
  deleteImages?: number[];

  @ApiPropertyOptional({
    description: '새로 업로드할 이미지 파일들 (최대 10개)',
    type: 'string',
    format: 'binary',
    isArray: true,
  })
  files?: any;
}

export class DeleteReviewDto {
  @ApiProperty({ description: '삭제할 리뷰 ID', example: 789 })
  @IsNotEmpty()
  reviewId: number;
}

export class ShopIdAndReviewIdParamDTO {
  @ApiProperty({ description: '리뷰 ID', example: 78 })
  @IsNotEmpty()
  reviewId: number;

  @ApiProperty({ description: '소품샵 ID', example: 78 })
  @IsNotEmpty()
  shopId: number;
}
