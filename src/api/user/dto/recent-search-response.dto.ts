import { RecentSearch } from '../../../database/entity/recent-search.entity';

export class RecentSearchDTO {
  id: number;
  shopName: string;
  shopId: number;

  constructor(id: number, shopName: string, shopId: number) {
    this.id = id;
    this.shopName = shopName;
    this.shopId = shopId;
  }

  static fromEntity(entity: RecentSearch): RecentSearchDTO {
    return new RecentSearchDTO(entity.id, entity.shopName, entity.shopId);
  }
}
