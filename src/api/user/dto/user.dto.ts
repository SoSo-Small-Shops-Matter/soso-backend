import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class NickNameDTO {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[^\x00-\x1F\x7F]*$/, {
    message: '제어 문자를 포함할 수 없습니다.',
  })
  @Matches(/^(?!.*(<script|<\/script>|<iframe|on\w+=|javascript:|eval\()).*$/i, {
    message: '스크립트 또는 악성 코드를 포함할 수 없습니다.',
  })
  nickName: string;
}

export class UpdateProfileDTO {
  @IsOptional()
  @Matches(/^[^\x00-\x1F\x7F]*$/, {
    message: '제어 문자를 포함할 수 없습니다.',
  })
  @Matches(/^(?!.*(<script|<\/script>|<iframe|on\w+=|javascript:|eval\()).*$/i, {
    message: '스크립트 또는 악성 코드를 포함할 수 없습니다.',
  })
  nickName?: string | null;
}

export class PageNationDTO {
  @IsNotEmpty()
  @Type(() => Number)
  page: number;

  @IsNotEmpty()
  @Type(() => Number)
  limit: number;
}

export class WishlistPageNationDTO {
  @IsNotEmpty()
  @Type(() => Number)
  page: number;

  @IsNotEmpty()
  @Type(() => Number)
  limit: number;

  @Matches(/^[^\x00-\x1F\x7F]*$/, {
    message: '제어 문자를 포함할 수 없습니다.',
  })
  @Matches(/^(?!.*(<script|<\/script>|<iframe|on\w+=|javascript:|eval\()).*$/i, {
    message: '스크립트 또는 악성 코드를 포함할 수 없습니다.',
  })
  area?: string;
}

export class ReviewPageNationDTO {
  @IsNotEmpty()
  @Type(() => Number)
  page: number;

  @IsNotEmpty()
  @Type(() => Number)
  limit: number;

  @IsNotEmpty()
  @Matches(/^[^\x00-\x1F\x7F]*$/, {
    message: '제어 문자를 포함할 수 없습니다.',
  })
  @Matches(/^(?!.*(<script|<\/script>|<iframe|on\w+=|javascript:|eval\()).*$/i, {
    message: '스크립트 또는 악성 코드를 포함할 수 없습니다.',
  })
  sort: string;
}
