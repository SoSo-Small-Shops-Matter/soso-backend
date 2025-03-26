import { Injectable } from '@nestjs/common';
import { FeedbackRepository } from './feedback.repository';
import { SaveFeedbackDTO } from './dto/feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private feedbackRepository: FeedbackRepository) {}

  async saveFeedback(uuid: string, saveFeedbackDTO: SaveFeedbackDTO) {
    const { feedback } = saveFeedbackDTO;
    return await this.feedbackRepository.saveFeedback(uuid, feedback);
  }
}
