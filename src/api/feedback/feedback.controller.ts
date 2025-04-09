import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { SaveFeedbackDTO } from './dto/feedback.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GetUUID } from '../../common/deco/get-user.deco';
import { SuccessResponseDTO } from '../../common/response/response.dto';

@Controller('feedback')
@UseGuards(JwtAuthGuard)
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post('/')
  async saveFeedback(@GetUUID() uuid: string, @Body() saveFeedbackDTO: SaveFeedbackDTO) {
    return new SuccessResponseDTO(await this.feedbackService.saveFeedback(uuid, saveFeedbackDTO));
  }
}
