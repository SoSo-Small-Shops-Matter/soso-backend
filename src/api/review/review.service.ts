import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { PostReviewDto } from './dto/review.dto';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class ReviewService {
    constructor(
        private reviewRepository:ReviewRepository,
        private awsService:AwsService,
    ){}

    async createReview(uuid,postReviewDto:PostReviewDto,images){
        const { shopId, content } = postReviewDto;
        return await this.reviewRepository.createReview(uuid,shopId,content);
    }

    async findUserReviewByUUID(uuid:string){
        return await this.reviewRepository.findUserReviewByUUID(uuid);
    }
    
    async imageUpload(file: Express.Multer.File[] | Express.Multer.File) {

        const imageUrl = await this.awsService.uploadImagesToS3(
            file,
            'reviews',
        );
      
        return { imageUrl };
    }
}
