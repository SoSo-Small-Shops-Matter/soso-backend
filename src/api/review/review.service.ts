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

    async createReview(
        uuid: string,
        postReviewDto: PostReviewDto,
        files?: Express.Multer.File[] | Express.Multer.File
    ) {
        const { shopId, content } = postReviewDto;
    
        // 이미지 업로드 및 URL 생성 (파일이 없을 경우 빈 배열 반환)
        const imageUrls = files ? await this.awsService.uploadImagesToS3(files, 'jpg') : [];
    
        // Review 생성
        const review = await this.reviewRepository.createReview(uuid,Number(shopId),content);
        
        // 이미지가 존재할 경우에만 처리
        if (imageUrls.length > 0) {
            // Image 엔티티 생성 및 저장
            const images = await Promise.all(
                imageUrls.map(async (url) => {
                    const image = await this.reviewRepository.createImage(url);
                    await this.reviewRepository.saveImage(image);
                    return image;
                })
            );
    
            // Review와 Image 연결
            review.images = images;
        }

        await this.reviewRepository.saveReview(review);
        return review;
    }
    

    async findUserReviewByUUID(uuid:string){
        return await this.reviewRepository.findUserReviewByUUID(uuid);
    }
}
