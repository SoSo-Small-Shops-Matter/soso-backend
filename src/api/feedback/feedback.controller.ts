import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { Success201ResponseDTO } from '../../common/response/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { SaveFeedback } from './dto/feedback.dto';

@Controller('feedback')
@UseGuards(AuthGuard('jwt'))
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}
  @Post('/')
  async saveFeedback(@Req() req, @Body() body: SaveFeedback) {
    const { uuid } = req.user;
    const { feedback } = body;
    return new Success201ResponseDTO(await this.feedbackService.saveFeedback(uuid, feedback));
  }
}
