import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserProfileDTO {
  uuid: string;
  email: string;
  photoUrl: string;
  nickName: string;

  constructor({ uuid, email, photoUrl, nickName }) {
    this.uuid = uuid;
    this.email = email;
    this.photoUrl = photoUrl;
    this.nickName = nickName;
  }
}
