import { ApiProperty } from '@nestjs/swagger';

export class UserProfileResponsesDTO {
  @ApiProperty({ description: '유저 이메일', example: 'user@example.com' })
  email: string;

  @ApiProperty({ description: '프로필 사진 URL', example: 'https://sosohan-bucket.s3.ap-northeast-2.amazonaws.com/profile.jpg' })
  photoUrl: string;

  @ApiProperty({ description: '닉네임', example: '소소한유저' })
  nickName: string;

  @ApiProperty({ description: '닉네임 작성 여부', example: true })
  isNew: boolean;

  constructor({ email, photoUrl, nickName, isNew }: { email: string; photoUrl: string; nickName: string; isNew: boolean }) {
    this.email = email;
    this.photoUrl = photoUrl;
    this.nickName = nickName;
    this.isNew = isNew;
  }
}
