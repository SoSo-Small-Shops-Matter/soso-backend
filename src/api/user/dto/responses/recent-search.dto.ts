import { ApiProperty } from '@nestjs/swagger';
import { RecentSearch } from '../../../../database/entity/recent-search.entity';

export class RecentSearchDTO {
  @ApiProperty({ example: 1 }) id: number;
  @ApiProperty({ example: '소소한 상점' }) shopName: string;
  @ApiProperty({ example: 42 }) shopId: number;

  constructor(init: Partial<RecentSearchDTO>) {
    Object.assign(this, init);
  }

  static fromEntities(entities: RecentSearch[]): RecentSearchDTO[] {
    return entities.map((e) => new RecentSearchDTO({ id: e.id, shopName: e.shopName, shopId: e.shopId }));
  }
}
