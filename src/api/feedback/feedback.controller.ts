import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { SaveFeedbackDTO } from './dto/feedback.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GetUUID } from '../../common/deco/get-user.deco';
import { SuccessNoResultResponseDTO } from '../../common/response/response.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('feedback')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post('/')
  @ApiOperation({
    summary: '건의사항 등록',
  })
  @ApiOkResponse({
    description: '건의사항 등록 성공',
    type: SuccessNoResultResponseDTO,
  })
  async saveFeedback(@GetUUID() uuid: string, @Body() saveFeedbackDTO: SaveFeedbackDTO) {
    await this.feedbackService.saveFeedback(uuid, saveFeedbackDTO);
    return new SuccessNoResultResponseDTO();
  }
}
