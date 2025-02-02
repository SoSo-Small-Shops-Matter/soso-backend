import { Body, Controller, Delete, Get, Post, Patch, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ReviewService } from './review.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { DeleteReviewDto, PostReviewDto, UpdateReviewDto } from './dto/review.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('review')
@UseGuards(AuthGuard('jwt'))
export class ReviewController {
    constructor(private reviewService:ReviewService){}

    @Post('/')
    @UseInterceptors(FilesInterceptor('files', 3)) // 최대 3개의 파일 허용
    async postReview(
        @Body() postReviewDto:PostReviewDto,
        @Req() req:any,
        @UploadedFiles() files?: Express.Multer.File[],
        @UploadedFile() file?: Express.Multer.File, // 단일 파일 처리
    ){
        const { uuid } = req.user;
        return new SuccessResponseDTO(await this.reviewService.createReview(uuid,postReviewDto,files || file));
    }

    @Patch('/')
    @UseInterceptors(FilesInterceptor('files', 3)) // 최대 3개의 파일 허용
    async updateReview(
        @Body() updateReviewDto:UpdateReviewDto,
        @Req() req:any,
        @UploadedFiles() files?: Express.Multer.File[],
        @UploadedFile() file?: Express.Multer.File, // 단일 파일 처리
    ){
        const { uuid } = req.user;
        return new SuccessResponseDTO(await this.reviewService.updateReview(uuid,updateReviewDto,files || file));
    }

    @Delete('/')
    async deleteReview(
        @Body() deleteReviewDto:DeleteReviewDto,
        @Req() req:any,
    ){
        const { uuid } = req.user;
        return new SuccessResponseDTO(await this.reviewService.deleteReviewByUUID(uuid,deleteReviewDto));
    }
}
