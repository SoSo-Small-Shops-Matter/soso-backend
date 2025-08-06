import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteRecentSearchDTO {
  @ApiProperty({
    description: '최근 기록에서 삭제할 소품샵 이름',
    example: 123,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  shopName: string;
}
