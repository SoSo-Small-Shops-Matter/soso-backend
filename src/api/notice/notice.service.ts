import { Injectable } from '@nestjs/common';
import { NoticeRepository } from './notice.repository';
import { NoticeDTO } from './dto/notice-response.dto';

@Injectable()
export class NoticeService {
  constructor(private readonly noticeRepository: NoticeRepository) {}
  async findAll() {
    const notices = await this.noticeRepository.findAll();
    return notices.map(NoticeDTO.fromEntity);
  }
}
