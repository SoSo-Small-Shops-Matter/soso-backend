import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Paging, ResponsePageNationDTO } from '../../shop/dto/paging.dto';
import { SubmitUserRecord } from '../../../database/entity/submit-user.entity';
import { getSubmitStatusEnum } from '../../../common/function/get-submit-status-enum';
import { Wishlist } from '../../../database/entity/wishlist.entity';
import { Review } from '../../../database/entity/review.entity';

export class PagingDto {
  page: number;
  limit: number;
  totalElements: number;
  totalPages: number;
  nextPage: boolean;

  constructor(page: number, limit: number, totalElements: number, totalPages: number, nextPage: boolean) {
    this.page = page;
    this.limit = limit;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
    this.nextPage = nextPage;
  }
}

export class ShopResponseDTO {
  @ApiProperty({ description: '샵 ID', example: 123 })
  id: number;

  @ApiProperty({ description: '샵 이름', example: '소소한취향 합정점' })
  name: string;

  @ApiPropertyOptional({
    description: '대표 이미지 URL',
    example: 'https://cdn.example.com/shops/123.jpg',
    nullable: true,
  })
  image: string | null;

  @ApiProperty({
    description: '샵 타입 (0: 검증된 shop, 1: 사용자 제보로 생성된 shop)',
    example: 0,
  })
  type: number;

  @ApiPropertyOptional({
    description: '인스타그램 계정/URL',
    example: 'https://www.instagram.com/soso_shop',
    nullable: true,
  })
  instagram: string | null;

  @ApiPropertyOptional({
    description: '주소/위치 설명',
    example: '서울 마포구 합정동 123-45',
    nullable: true,
  })
  location: string | null;
}

export class UserSubmitRecordItemDTO {
  @ApiProperty({ description: '제출 ID', example: 101 })
  id: number;

  @ApiProperty({ description: '제출 유형 (예: 0 = 새로운 소품샵, 1 = 운영정보, 2 = 판매목록)', example: 0 })
  type: number;

  @ApiProperty({ description: '제출 상태 (예: 0 = 대기, 1 = 승인, 2 = 거절)', example: 2 })
  status: number;

  @ApiProperty({ description: '거절 사유 메시지 (거절된 경우에만 존재)', nullable: true, example: '사진이 부적절합니다.' })
  rejectMessage: string | null;

  @ApiProperty({ description: 'status와 type으로 정의한 submitStatus 제거할 예정. 0~8', example: 7 })
  submitStatus: number;

  @ApiProperty({ description: '제출 생성일', example: '2025-08-09T12:34:56.000Z' })
  createdAt: Date;

  @ApiProperty({ description: '제출한 소품샵 정보', type: () => ShopResponseDTO })
  shop: ShopResponseDTO;

  constructor(record: SubmitUserRecord) {
    this.id = record.id;
    this.type = record.type;
    this.status = record.status;
    this.rejectMessage = record.rejectMessage;
    this.submitStatus = getSubmitStatusEnum(record.type, record.status);
    this.createdAt = record.createdAt;
    this.shop = record.shop;
  }
}

export class UserSubmitRecordDTO extends ResponsePageNationDTO<UserSubmitRecordItemDTO> {
  @ApiProperty({ type: [UserSubmitRecordItemDTO] })
  data: UserSubmitRecordItemDTO[];

  @ApiProperty({ type: Paging })
  pageInfo: Paging;
}

export class ShopItemDTO {
  @ApiProperty({ description: '소품샵 ID', example: 7 })
  id: number;

  @ApiProperty({ description: '소품샵 이름', example: '카페포 옹' })
  name: string;

  @ApiProperty({ description: '대표 이미지 URL', example: 'https://example.com/image.jpg' })
  image: string;
}

export class UserWishlistRecordItemDTO {
  @ApiProperty({ description: '찜 기록 ID', example: 15 })
  id: number;

  @ApiProperty({ description: '생성일', example: '2025-08-02T06:11:18.498Z' })
  createdAt: Date;

  @ApiProperty({ description: '수정일', example: '2025-08-02T06:11:18.498Z' })
  updatedAt: Date;

  @ApiProperty({ type: ShopItemDTO, description: '소품샵 정보' })
  shop: ShopItemDTO;

  constructor(record: Wishlist) {
    this.id = record.id;
    this.createdAt = record.createdAt;
    this.updatedAt = record.updatedAt;
    this.shop = record.shop;
  }
}

export class UserWishlistRecordDTO extends ResponsePageNationDTO<UserWishlistRecordItemDTO> {
  @ApiProperty({
    type: [UserWishlistRecordItemDTO],
    description: '찜한 소품샵 리스트',
  })
  data: UserWishlistRecordItemDTO[];

  @ApiProperty({
    type: Paging,
    description: '페이지네이션 정보',
  })
  pageInfo: Paging;
}

export class UserReviewsRecordItemDTO {
  @ApiProperty({ description: '찜 기록 ID', example: 15 })
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

export class UserReviewsRecordDTO extends ResponsePageNationDTO<UserReviewsRecordItemDTO> {
  @ApiProperty({
    type: [UserReviewsRecordItemDTO],
    description: '사용자가 작성한 리뷰 리스트',
  })
  data: UserReviewsRecordItemDTO[];

  @ApiProperty({
    type: Paging,
    description: '페이지네이션 정보',
  })
  pageInfo: Paging;
}
