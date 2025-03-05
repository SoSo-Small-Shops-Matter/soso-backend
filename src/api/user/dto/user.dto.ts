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
