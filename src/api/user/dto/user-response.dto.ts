export class ResponseUserProfileDTO {
  uuid: string;
  email: string;
  photoUrl: string;
  nickName: string;
  isNew: boolean;

  constructor({ uuid, email, photoUrl, nickName, isNew }) {
    this.uuid = uuid;
    this.email = email;
    this.photoUrl = photoUrl;
    this.nickName = nickName;
    this.isNew = isNew;
  }
}
