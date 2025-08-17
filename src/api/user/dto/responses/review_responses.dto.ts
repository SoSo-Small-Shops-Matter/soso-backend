import { ApiProperty } from '@nestjs/swagger';
import { PageInfoDTO, Pagination_responsesDto } from './pagination_responses.dto';
import { Review } from '../../../../database/entity/review.entity';

export class ShopItemDTO {
  @ApiProperty({ description: '소품샵 ID', example: 7 })
  id: number;

  @ApiProperty({ description: '소품샵 이름', example: '카페포 옹' })
  name: string;

  @ApiProperty({ description: '대표 이미지 URL', example: 'https://example.com/image.jpg', nullable: true })
  image: string | null;
}

export class UserReviewsRecordItemDTO {
  @ApiProperty({ description: '리뷰 ID', example: 15 })
  id: number;

  @ApiProperty({ description: '생성일', example: '2025-08-02T06:11:18.498Z' })
  createdAt: Date;

  @ApiProperty({ description: '리뷰 글', example: '리뷰내용~~' })
  content: string;

  @ApiProperty({ type: ShopItemDTO, description: '소품샵 정보' })
  shop: ShopItemDTO;

  constructor(record: Review) {
    this.id = record.id;
    this.createdAt = record.createdAt;
    this.content = record.content;
    this.shop = record.shop;
  }
}

export class UserReviewsRecordDTO extends Pagination_responsesDto<UserReviewsRecordItemDTO> {
  @ApiProperty({
    type: [UserReviewsRecordItemDTO],
    description: '사용자가 작성한 리뷰 리스트',
  })
  data: UserReviewsRecordItemDTO[];

  @ApiProperty({
    type: PageInfoDTO,
    description: '페이지네이션 정보',
  })
  pageInfo: PageInfoDTO;
}
