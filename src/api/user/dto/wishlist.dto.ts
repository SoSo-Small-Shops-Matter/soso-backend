import { IsNotEmpty, IsNumber } from 'class-validator';

export class SaveWishListDTO {
  @IsNumber()
  @IsNotEmpty()
  shopId: number;
}
