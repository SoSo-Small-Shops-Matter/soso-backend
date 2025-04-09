import { Body, Controller, Delete, Post, Patch, UploadedFiles, UseGuards, UseInterceptors, Param } from '@nestjs/common';
import { ReviewService } from './review.service';
import { DeleteReviewDto, PostReviewDto, UpdateReviewDto } from './dto/review.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GetUUID } from '../../common/deco/get-user.deco';
import { SuccessResponseDTO } from '../../common/response/response.dto';

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
  async postReview(@Body() postReviewDto: PostReviewDto, @GetUUID() uuid: string, @UploadedFiles() files?: Express.Multer.File[]) {
    const result = await this.reviewService.createReview(uuid, postReviewDto, files);
    return new SuccessResponseDTO(result);
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
  async updateReview(@Body() updateReviewDto: UpdateReviewDto, @GetUUID() uuid: string, @UploadedFiles() newFiles?: Express.Multer.File[]) {
    const result = await this.reviewService.updateReview(uuid, updateReviewDto, newFiles);
    return new SuccessResponseDTO(result);
  }

  @Delete('/:reviewId')
  async deleteReview(@Param() deleteReviewDto: DeleteReviewDto, @GetUUID() uuid: string) {
    const result = await this.reviewService.deleteReviewByUUID(uuid, deleteReviewDto);
    return new SuccessResponseDTO(result);
  }
}
