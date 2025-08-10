import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveWishListDTO {
  @ApiProperty({ type: 'number', example: 12, required: true })
  @IsNumber()
  @IsNotEmpty()
  shopId: number;
}
