import { Controller, Get } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { SuccessResponseDTO } from '../../common/response/response.dto';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}
  @Get('/')
  async getNotice() {
    return new SuccessResponseDTO(await this.noticeService.findAll());
  }
}
