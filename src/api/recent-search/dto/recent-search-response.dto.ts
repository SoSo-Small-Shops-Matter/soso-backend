import { ApiProperty } from '@nestjs/swagger';
import { RecentSearch } from '../../../database/entity/recent-search.entity';

export class RecentSearchDTO {
  @ApiProperty({ description: '최근 검색 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '소품샵 이름', example: '소소한 상점' })
  shopName: string;

  @ApiProperty({ description: '소품샵 ID', example: 42 })
  shopId: number;

  constructor(data: Partial<RecentSearchDTO>) {
    Object.assign(this, data);
  }

  static fromEntities(entities: RecentSearch[]): RecentSearchDTO[] {
    return entities.map(
      (e) =>
        new RecentSearchDTO({
          id: e.id,
          shopName: e.shopName,
          shopId: e.shopId,
        }),
    );
  }
}
