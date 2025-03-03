import { Injectable } from '@nestjs/common';
import { NoticeRepository } from './notice.repository';

@Injectable()
export class NoticeService {
  constructor(private readonly noticeRepository: NoticeRepository) {}
  async findAll() {
    return await this.noticeRepository.findAll();
  }
}
