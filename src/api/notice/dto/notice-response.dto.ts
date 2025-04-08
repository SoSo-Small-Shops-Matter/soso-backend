import { Notice } from '../../../database/entity/notice.entity';

export class NoticeDTO {
  id: number;
  title: string;
  text: string;
  createdAt: Date;

  constructor(id: number, title: string, text: string, createdAt: Date) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.createdAt = createdAt;
  }

  static fromEntity(entity: Notice): NoticeDTO {
    return new NoticeDTO(entity.id, entity.title, entity.text, entity.createdAt);
  }
}
