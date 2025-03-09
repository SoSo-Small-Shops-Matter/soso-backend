import { Injectable } from '@nestjs/common';
import { FeedbackRepository } from './feedback.repository';

@Injectable()
export class FeedbackService {
  constructor(private feedbackRepository: FeedbackRepository) {}

  async saveFeedback(uuid: string, feedback: string) {
    return await this.feedbackRepository.saveFeedback(uuid, feedback);
  }
}
