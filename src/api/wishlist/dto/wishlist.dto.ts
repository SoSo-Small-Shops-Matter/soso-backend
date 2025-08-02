import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveWishListDTO {
  @ApiProperty({ type: 'integer', example: 3 })
  @IsNumber()
  @IsNotEmpty()
  shopId: number;
}
