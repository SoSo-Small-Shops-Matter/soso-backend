import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { PostReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
    constructor(private reviewRepository:ReviewRepository){}

    async createReview(uuid,postReviewDto:PostReviewDto){
        const { shopId, content } = postReviewDto;
        return await this.reviewRepository.createReview(uuid,shopId,content);
    }

    async findUserReviewByUUID(uuid:string){
        return await this.reviewRepository.findUserReviewByUUID(uuid);
    }

}
