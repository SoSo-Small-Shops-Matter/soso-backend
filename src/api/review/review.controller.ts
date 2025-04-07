import {
  Body,
  Controller,
  Delete,
  Post,
  Patch,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { DeleteReviewDto, PostReviewDto, UpdateReviewDto } from './dto/review.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('review')
@UseGuards(JwtAuthGuard)
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(FilesInterceptor('files', 10)) // 최대 10개의 파일 허용
  async postReview(@Body() postReviewDto: PostReviewDto, @Req() req: any, @UploadedFiles() files?: Express.Multer.File[]): Promise<void> {
    const { uuid } = req.user;
    await this.reviewService.createReview(uuid, postReviewDto, files);
  }

  @Patch('/')
  @UseInterceptors(FilesInterceptor('files', 10)) // 최대 10개의 파일 허용
  async updateReview(@Body() updateReviewDto: UpdateReviewDto, @Req() req: any, @UploadedFiles() newFiles?: Express.Multer.File[]) {
    const { uuid } = req.user;
    return new SuccessResponseDTO(await this.reviewService.updateReview(uuid, updateReviewDto, newFiles));
  }

  @Delete('/:reviewId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteReview(@Param() deleteReviewDto: DeleteReviewDto, @Req() req: any): Promise<void> {
    const { uuid } = req.user;
    await this.reviewService.deleteReviewByUUID(uuid, deleteReviewDto);
  }
}
