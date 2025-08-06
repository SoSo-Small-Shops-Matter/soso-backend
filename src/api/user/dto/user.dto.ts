import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CheckNickNameDTO {
  @ApiProperty({ description: '닉네임', example: '닉네임' })
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

export class DeleteTypeDTO {
  @ApiProperty({ description: '회원 탈퇴 이유 Type', example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  deleteType: number;
}

export class DeleteUuidDTO {
  @ApiProperty({ description: '사용자 UUID', example: 'uuid' })
  @IsNotEmpty()
  @IsString()
  uuid: string;
}

export class UpdateProfileDTO {
  @ApiProperty({ description: '닉네임', example: '닉네임' })
  @IsOptional()
  @Matches(/^[^\x00-\x1F\x7F]*$/, {
    message: '제어 문자를 포함할 수 없습니다.',
  })
  @Matches(/^(?!.*(<script|<\/script>|<iframe|on\w+=|javascript:|eval\()).*$/i, {
    message: '스크립트 또는 악성 코드를 포함할 수 없습니다.',
  })
  nickName?: string | null;
}

export class UserProfileDTO {
  @ApiProperty({ description: '유저 UUID', example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef' })
  uuid: string;

  @ApiProperty({ description: '유저 이메일', example: 'user@example.com' })
  email: string;

  @ApiProperty({ description: '프로필 사진 URL', example: 'https://sosohan-bucket.s3.ap-northeast-2.amazonaws.com/profile.jpg' })
  photoUrl: string;

  @ApiProperty({ description: '닉네임', example: '소소한유저' })
  nickName: string;

  @ApiProperty({ description: '닉네임 작성 여부', example: true })
  isNew: boolean;

  constructor({ uuid, email, photoUrl, nickName, isNew }: { uuid: string; email: string; photoUrl: string; nickName: string; isNew: boolean }) {
    this.uuid = uuid;
    this.email = email;
    this.photoUrl = photoUrl;
    this.nickName = nickName;
    this.isNew = isNew;
  }
}

export class PageNationDTO {
  @ApiProperty({ description: '현재 페이지', example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  page: number;

  @ApiProperty({ description: '페이지당 항목 수', example: 10 })
  @IsNotEmpty()
  @Type(() => Number)
  limit: number;
}

export class WishlistPageNationDTO {
  @ApiProperty({ description: '현재 페이지', example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  page: number;

  @ApiProperty({ description: '페이지당 항목 수', example: 10 })
  @IsNotEmpty()
  @Type(() => Number)
  limit: number;

  @ApiPropertyOptional({ description: '지역 필터링', example: '서울' })
  @IsOptional()
  @Matches(/^[^\x00-\x1F\x7F]*$/, {
    message: '제어 문자를 포함할 수 없습니다.',
  })
  @Matches(/^(?!.*(<script|<\/script>|<iframe|on\w+=|javascript:|eval\()).*$/i, {
    message: '스크립트 또는 악성 코드를 포함할 수 없습니다.',
  })
  area?: string;
}

export class ReviewPageNationDTO {
  @ApiProperty({ description: '현재 페이지', example: 1 })
  @IsNotEmpty()
  @Type(() => Number)
  page: number;

  @ApiProperty({ description: '페이지당 항목 수', example: 10 })
  @IsNotEmpty()
  @Type(() => Number)
  limit: number;

  @ApiProperty({ description: 'DESC: 최신순 ACS:오래된 순 ', enum: ['ACS', 'DESC'] })
  @IsNotEmpty()
  @Matches(/^[^\x00-\x1F\x7F]*$/, {
    message: '제어 문자를 포함할 수 없습니다.',
  })
  @Matches(/^(?!.*(<script|<\/script>|<iframe|on\w+=|javascript:|eval\()).*$/i, {
    message: '스크립트 또는 악성 코드를 포함할 수 없습니다.',
  })
  sort: string;
}

export class SaveWishListDTO {
  @ApiProperty({ type: 'integer', example: 3 })
  @IsNumber()
  @IsNotEmpty()
  shopId: number;
}
