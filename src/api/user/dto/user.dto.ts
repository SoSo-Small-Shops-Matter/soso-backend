import { IsNotEmpty, IsOptional } from 'class-validator';

export class NickNameDto {
  nickName: string;
}

export class UpdateProfileDto {
  @IsOptional()
  // @IsString()
  // @Length(2, 10)
  nickName?: string | null;
}

export class PageNationDto {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  limit: number;
}

export class WishlistPageNationDto {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  limit: number;

  area?: string;
}

export class ReviewPageNationDto {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  limit: number;

  @IsNotEmpty()
  sort: string;
}
