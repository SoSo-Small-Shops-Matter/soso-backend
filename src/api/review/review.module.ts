import { Module } from '@nestjs/common';
import { Review } from 'src/database/entity/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewRepository } from './review.repository';
import { AwsModule } from '../aws/aws.module';
import { Image } from 'src/database/entity/image.entity';
import { ImageModule } from '../image/image.module';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Image]), AwsModule, ImageModule, TransactionsModule],
  providers: [ReviewRepository],
  exports: [ReviewRepository],
})
export class ReviewModule {}
