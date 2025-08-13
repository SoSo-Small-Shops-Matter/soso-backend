// lists/wishlist-record.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { PageInfoDTO, PaginationDto } from '../responses/pagination.dto';
import { Wishlist } from '../../../../database/entity/wishlist.entity';

export class ShopItemDTO {
  @ApiProperty({ description: '소품샵 ID', example: 7 })
  id: number;

  @ApiProperty({ description: '소품샵 이름', example: '카페포 옹' })
  name: string;

  @ApiProperty({ description: '대표 이미지 URL', example: 'https://example.com/image.jpg', nullable: true })
  image: string | null;
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
    // 엔티티에 shop 관계가 로드되어 있다는 전제
    this.shop = record.shop as unknown as ShopItemDTO;
  }
}

export class UserWishlistRecordDTO extends PaginationDto<UserWishlistRecordItemDTO> {
  @ApiProperty({
    type: [UserWishlistRecordItemDTO],
    description: '찜한 소품샵 리스트',
  })
  data: UserWishlistRecordItemDTO[];

  @ApiProperty({
    type: PageInfoDTO,
    description: '페이지네이션 정보',
  })
  pageInfo: PageInfoDTO;
}
