import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from '../../database/entity/feedback.entity';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

export class FeedbackRepository {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  async saveFeedback(uuid: string, feedback: string) {
    try {
      const newFeedback = await this.feedbackRepository.create({ uuid, text: feedback });
      return this.feedbackRepository.save(newFeedback);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }
}
