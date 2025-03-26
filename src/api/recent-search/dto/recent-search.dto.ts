import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class DeleteRecentSearchDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  shopName: string;
}
