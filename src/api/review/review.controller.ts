import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { PostReviewDto } from './dto/review.dto';

@Controller('review')
@UseGuards(AuthGuard('jwt'))
export class ReviewController {
    constructor(private reviewService:ReviewService){}

    @Post('/')
    async postReview(
        @Body() postReviewDto:PostReviewDto,
        @Req() req:any,
    ){
        const { uuid } = req.user;
        return new SuccessResponseDTO(await this.reviewService.createReview(uuid,postReviewDto));
    }

    @Get('/')
    async getUserReview(
        @Req() req:any,
    ){
        const { uuid } = req.user;
        return new SuccessResponseDTO(await this.reviewService.findUserReviewByUUID(uuid));
    }
}
