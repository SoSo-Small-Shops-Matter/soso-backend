import { getSubmitStatusEnum } from 'src/common/function/get-submit-status-enum';
import { SubmitUserRecord } from '../../../database/entity/submit-user.entity';

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

export class ResponseSubmitUserRecordDTO {
  id: number;
  type: number;
  status: number;
  shopName: string;
  rejectMessage: string | null;

  submitStatus: number;

  constructor(record: SubmitUserRecord) {
    this.id = record.id;
    this.type = record.type;
    this.status = record.status;
    this.shopName = record.shop?.name ?? '';
    this.rejectMessage = record.rejectMessage;
    this.submitStatus = getSubmitStatusEnum(record.type, record.status);
  }
}
