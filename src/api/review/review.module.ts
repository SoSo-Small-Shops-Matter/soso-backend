import { Module } from '@nestjs/common';
import { Review } from 'src/database/entity/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewRepository } from './review.repository';
import { AwsModule } from '../aws/aws.module';
import { Image } from 'src/database/entity/image.entity';
import { ImageModule } from '../image/image.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReportModule } from '../report/report.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Image]), ReviewModule, AwsModule, ImageModule, TransactionsModule, ReportModule],
  controllers: [ReviewController],
  providers: [ReviewRepository, ReviewService],
  exports: [ReviewRepository],
})
export class ReviewModule {}
