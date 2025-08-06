import { Body, Controller, Delete, Post, Patch, UploadedFiles, UseGuards, UseInterceptors, Param } from '@nestjs/common';
import { ReviewService } from './review.service';
import { DeleteReviewDto, PostReviewDto, UpdateReviewDto } from './dto/review.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GetUUID } from '../../common/deco/get-user.deco';
import { SuccessNoResultResponseDTO } from '../../common/response/response.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('review')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
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
  @ApiOperation({ summary: '리뷰 작성', description: '리뷰를 작성합니다.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '리뷰 데이터 및 이미지 파일',
    type: PostReviewDto,
  })
  @ApiOkResponse({
    description: '리뷰 작성 성공',
    type: SuccessNoResultResponseDTO,
  })
  async postReview(@Body() postReviewDto: PostReviewDto, @GetUUID() uuid: string, @UploadedFiles() files?: Express.Multer.File[]) {
    await this.reviewService.createReview(uuid, postReviewDto, files);
    return new SuccessNoResultResponseDTO();
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
  @ApiOperation({ summary: '리뷰 수정', description: '리뷰를 수정합니다.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '리뷰 데이터 및 이미지 파일',
    type: UpdateReviewDto,
  })
  @ApiOkResponse({
    description: '리뷰 수정 성공',
    type: SuccessNoResultResponseDTO,
  })
  async updateReview(@Body() updateReviewDto: UpdateReviewDto, @GetUUID() uuid: string, @UploadedFiles() newFiles?: Express.Multer.File[]) {
    await this.reviewService.updateReview(uuid, updateReviewDto, newFiles);
    return new SuccessNoResultResponseDTO();
  }

  @Delete('/:reviewId')
  @ApiOperation({ summary: '리뷰 삭제', description: '리뷰를 삭제합니다.' })
  @ApiOkResponse({
    description: '리뷰 삭제 성공',
    type: SuccessNoResultResponseDTO,
  })
  async deleteReview(@Param() deleteReviewDto: DeleteReviewDto, @GetUUID() uuid: string) {
    await this.reviewService.deleteReviewByUUID(uuid, deleteReviewDto);
    return new SuccessNoResultResponseDTO();
  }
}
