import { Module } from '@nestjs/common';
import { Review } from 'src/database/entity/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewRepository } from './review.repository';
import { AwsModule } from '../aws/aws.module';
import { Image } from 'src/database/entity/image.entity';
import { TransactionsModule } from '../transactions/transactions.module';
import { ReviewService } from './review.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Image]), AwsModule, TransactionsModule],
  providers: [ReviewService, ReviewRepository],
  exports: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
