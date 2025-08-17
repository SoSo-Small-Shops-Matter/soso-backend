import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class Wishlist_requestsDto {
  @ApiProperty({ description: '소품샵 ID', example: 42 })
  @IsNumber()
  @IsNotEmpty()
  shopId: number;
}
