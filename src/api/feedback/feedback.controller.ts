import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { SaveFeedbackDTO } from './dto/feedback.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GetUUID } from '../../common/deco/get-user.deco';

@Controller('feedback')
@UseGuards(JwtAuthGuard)
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  async saveFeedback(@GetUUID() uuid: string, @Body() saveFeedbackDTO: SaveFeedbackDTO) {
    await this.feedbackService.saveFeedback(uuid, saveFeedbackDTO);
  }
}
