import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ShopReportDto {
  @ApiProperty({
    description: '신고 상태 코드 (예: 0: 잘못된 정보, 1: 부적절한 내용 등)',
    example: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  status: number;

  @ApiPropertyOptional({
    description: '신고 사유 메시지 (선택 사항, 최대 100자)',
    example: '정보가 실제와 다릅니다.',
  })
  @IsOptional()
  message?: string;
}

export class ReviewReportDto {
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
