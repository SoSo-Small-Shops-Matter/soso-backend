import { Body, Controller, Delete, Post, Patch, UploadedFiles, UseGuards, UseInterceptors, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ReviewService } from './review.service';
import { DeleteReviewDto, PostReviewDto, UpdateReviewDto } from './dto/review.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GetUUID } from '../../common/deco/get-user.deco';

@Controller('review')
@UseGuards(JwtAuthGuard)
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post('/')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: { fileSize: 5 * 1024 * 1024 }, // 최대 5MB
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) cb(null, true);
        else cb(new Error('Only images allowed!'), false);
      },
    }),
  )
  @HttpCode(HttpStatus.NO_CONTENT)
  async postReview(@Body() postReviewDto: PostReviewDto, @GetUUID() uuid: string, @UploadedFiles() files?: Express.Multer.File[]): Promise<void> {
    await this.reviewService.createReview(uuid, postReviewDto, files);
  }

  @Patch('/')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: { fileSize: 5 * 1024 * 1024 }, // 최대 5MB
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) cb(null, true);
        else cb(new Error('Only images allowed!'), false);
      },
    }),
  )
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateReview(@Body() updateReviewDto: UpdateReviewDto, @GetUUID() uuid: string, @UploadedFiles() newFiles?: Express.Multer.File[]) {
    await this.reviewService.updateReview(uuid, updateReviewDto, newFiles);
  }

  @Delete('/:reviewId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteReview(@Param() deleteReviewDto: DeleteReviewDto, @GetUUID() uuid: string): Promise<void> {
    await this.reviewService.deleteReviewByUUID(uuid, deleteReviewDto);
  }
}
