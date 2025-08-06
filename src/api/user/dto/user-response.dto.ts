import { getSubmitStatusEnum } from 'src/common/function/get-submit-status-enum';
import { SubmitUserRecord } from '../../../database/entity/submit-user.entity';
import { Shop } from '../../../database/entity/shop.entity';
import { AuthProvider } from '../../../common/enum/auth.enum';

export class ResponseUserProfileDTO {
  uuid: string;
  email: string;
  photoUrl: string;
  nickName: string;
  isNew: boolean;
  provider: AuthProvider;

  constructor({ uuid, email, photoUrl, nickName, isNew, provider }: ResponseUserProfileDTO) {
    this.uuid = uuid;
    this.email = email;
    this.photoUrl = photoUrl;
    this.nickName = nickName;
    this.isNew = isNew;
    this.provider = provider;
  }
}

export class ResponseSubmitUserRecordDTO {
  id: number;
  type: number;
  status: number;
  rejectMessage: string | null;
  submitStatus: number;
  createdAt: Date;
  shop: Shop;

  constructor(record: SubmitUserRecord) {
    this.id = record.id;
    this.type = record.type;
    this.status = record.status;
    this.rejectMessage = record.rejectMessage;
    this.submitStatus = getSubmitStatusEnum(record.type, record.status);
    this.createdAt = record.createdAt;
    this.shop = record.shop;
  }
}
