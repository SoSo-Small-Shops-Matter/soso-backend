import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteTypeDTO {
  @ApiProperty({ description: '회원 탈퇴 이유 Type', example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  deleteType: number;
}
