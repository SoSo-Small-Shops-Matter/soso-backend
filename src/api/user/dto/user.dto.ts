import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class NickNameDTO {
  @ApiProperty({ type: 'string', example: 'nickname', required: true })
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
  @ApiProperty({ type: 'string', example: 'nickname', required: true })
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
  @ApiProperty({ type: 'number', example: 1, required: true })
  @IsNotEmpty()
  @Type(() => Number)
  page: number;

  @ApiProperty({ type: 'number', example: 1, required: true })
  @IsNotEmpty()
  @Type(() => Number)
  limit: number;
}

export class WishlistPageNationDTO {
  @ApiProperty({ type: 'number', example: 1, required: true })
  @IsNotEmpty()
  @Type(() => Number)
  page: number;

  @ApiProperty({ type: 'number', example: 1, required: true })
  @IsNotEmpty()
  @Type(() => Number)
  limit: number;

  @ApiProperty({ type: 'string', example: '서울' })
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

  @ApiProperty({ type: 'string', example: 'DES' })
  @IsNotEmpty()
  @Matches(/^[^\x00-\x1F\x7F]*$/, {
    message: '제어 문자를 포함할 수 없습니다.',
  })
  @Matches(/^(?!.*(<script|<\/script>|<iframe|on\w+=|javascript:|eval\()).*$/i, {
    message: '스크립트 또는 악성 코드를 포함할 수 없습니다.',
  })
  sort: string;
}
