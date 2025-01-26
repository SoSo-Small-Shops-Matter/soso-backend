import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { DeleteReviewDto, PostReviewDto, UpdateReviewDto } from './dto/review.dto';
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
    }

    async updateReview(
        uuid: string,
        updateReviewDto: UpdateReviewDto,
        files?: Express.Multer.File[] | Express.Multer.File
    ) {
        const { reviewId ,content } = updateReviewDto;
        
        // 이미지 업로드 및 URL 생성 (파일이 없을 경우 빈 배열 반환)
        const imageUrls = files ? await this.awsService.uploadImagesToS3(files, 'jpg') : [];
    
        // Review 생성
        const review = await this.reviewRepository.findReviewByReviewId(uuid,reviewId);

        if(!review){
            throw new NotFoundException('찾을 수 없는 리뷰');
        }

        // 리뷰 이미지를 수정했을 경우 
        if (imageUrls.length > 0) {

            if(review.images.length > 0) {
                await Promise.all(
                    review.images.map(async (data)=>{
                        console.log(data.id);
                        const result = await this.reviewRepository.deleteImage(data.id);
                        console.log(result);
                    })
                )
            }

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

        // 리뷰 글을 수정했을 경우 
        if (content){
            review.content = content;
        }

        return await this.reviewRepository.saveReview(review);
    }
    
    async deleteReviewByUUID(uuid:string, deleteReviewDto:DeleteReviewDto){
        const { reviewId } = deleteReviewDto;
        const review = await this.reviewRepository.findReviewByReviewId(uuid,reviewId);

        if(review.images.length > 0) {
            await Promise.all(
                review.images.map(async (data)=>{
                    const result = await this.reviewRepository.deleteImage(data.id);
                })
            )
        }
        await this.reviewRepository.removeReview(review);
    }

    async findUserReviewByUUID(uuid:string){
        return await this.reviewRepository.findUserReviewByUUID(uuid);
    }

    async findShopReviewsByShopId(shopId: number, uuid: string){
        const reviews =  await this.reviewRepository.findShopReviewsByShopId(shopId);
        const userReviews = reviews.filter((review) => review.user.uuid === uuid);
        const otherReviews = reviews.filter((review) => review.user.uuid != uuid);
        return {
            userReviews,
            otherReviews
        }
    }
}
