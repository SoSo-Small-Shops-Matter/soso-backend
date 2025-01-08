import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { AuthModule } from '../auth/auth.module';
import { Review } from 'src/database/entity/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewRepository } from './review.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Review]),AuthModule],
  controllers: [ReviewController],
  providers: [ReviewService,ReviewRepository],
})
export class ReviewModule {}
