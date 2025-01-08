import { InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "src/database/entity/review.entity";
import { Repository } from "typeorm";

export class ReviewRepository {
    constructor(
        @InjectRepository(Review)
        private reviewRepository:Repository<Review>
    ) {}

    async createReview(uuid,shopId,content){
        try{
            return await this.reviewRepository.save({
                user:{
                    uuid,
                },
                shop:{
                    id:shopId,
                },
                content,
            })
        }catch(err){
            console.error(err);
            throw new InternalServerErrorException()
        }
    }
}