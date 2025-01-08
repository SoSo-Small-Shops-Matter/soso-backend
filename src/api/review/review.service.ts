import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
    constructor(private reviewRepository:ReviewRepository){}

    async createReview(uuid,shopId,content){
        return await this.reviewRepository.createReview(uuid,shopId,content);
    }

    async findUserReviewByUUID(uuid:string){
        return await this.reviewRepository.findUserReviewByUUID(uuid);
    }

}
