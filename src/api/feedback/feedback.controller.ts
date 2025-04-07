import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { SaveFeedbackDTO } from './dto/feedback.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('feedback')
@UseGuards(JwtAuthGuard)
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  async saveFeedback(@Req() req, @Body() saveFeedbackDTO: SaveFeedbackDTO) {
    const { uuid } = req.user;
    await this.feedbackService.saveFeedback(uuid, saveFeedbackDTO);
  }
}
