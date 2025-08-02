import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteRecentSearchDTO {
  @IsNotEmpty()
  @IsNumber()
  recentSearchId: number;
}
