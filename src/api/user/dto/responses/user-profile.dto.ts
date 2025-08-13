import { ApiProperty } from '@nestjs/swagger';

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
