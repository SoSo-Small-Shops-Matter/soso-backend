import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Success201ResponseDTO } from '../../common/response/response.dto';
import { SaveFeedbackDTO } from './dto/feedback.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('feedback')
@UseGuards(JwtAuthGuard)
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post('/')
  async saveFeedback(@Req() req, @Body() saveFeedbackDTO: SaveFeedbackDTO) {
    const { uuid } = req.user;
    await this.feedbackService.saveFeedback(uuid, saveFeedbackDTO);
    return new Success201ResponseDTO();
  }
}
