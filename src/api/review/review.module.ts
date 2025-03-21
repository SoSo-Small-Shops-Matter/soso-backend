import { Module, forwardRef } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { AuthModule } from '../auth/auth.module';
import { Review } from 'src/database/entity/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewRepository } from './review.repository';
import { AwsModule } from '../aws/aws.module';
import { Image } from 'src/database/entity/image.entity';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Image]), forwardRef(() => AuthModule), AwsModule, ImageModule],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
  exports: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
