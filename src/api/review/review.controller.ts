import { Body, Controller, Get, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ReviewService } from './review.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { PostReviewDto } from './dto/review.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('review')
@UseGuards(AuthGuard('jwt'))
export class ReviewController {
    constructor(private reviewService:ReviewService){}

    @Post('/')
    @UseInterceptors(FilesInterceptor('files', 10)) // 최대 10개의 파일 허용
    async postReview(
        @Body() postReviewDto:PostReviewDto,
        @Req() req:any,
        @UploadedFiles() files?: Express.Multer.File[],
        @UploadedFile() file?: Express.Multer.File, // 단일 파일 처리
    ){
        const { uuid } = req.user;
        return new SuccessResponseDTO(await this.reviewService.createReview(uuid,postReviewDto,files || file));
    }

    @Get('/')
    async getUserReview(
        @Req() req:any,
    ){
        const { uuid } = req.user;
        return new SuccessResponseDTO(await this.reviewService.findUserReviewByUUID(uuid));
    }
}
