import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReviewReportDto {
  @ApiProperty({
    description: '신고할 리뷰 ID',
    example: 123,
  })
  @IsNotEmpty()
  @IsNumber()
  reviewId: number;

  @ApiProperty({
    description: '신고 상태',
    example: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  status: number;

  @ApiPropertyOptional({
    description: '신고 사유 메시지 (선택 사항, 최대 100자)',
    example: '광고성 내용입니다.',
  })
  @IsOptional()
  message?: string;
}
