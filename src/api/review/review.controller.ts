import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('review')
@UseGuards(AuthGuard('jwt'))
export class ReviewController {
    constructor(private reviewService:ReviewService){}

    @Post('/')
    async postReview(
        @Body() body:any,
        @Req() req:any,
    ){
        const { shopId,content } = body;
        const { uuid } = req.user;
        return new SuccessResponseDTO(await this.reviewService.createReview(uuid,shopId,content));
    }
}
