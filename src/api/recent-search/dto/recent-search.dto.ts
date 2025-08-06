import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class DeleteRecentSearchDTO {
  @ApiProperty({
    description: '최근 기록에서 삭제할 id',
    example: 123,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  recentSearchId: number;
}
