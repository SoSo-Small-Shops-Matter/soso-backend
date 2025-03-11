import { InjectRepository } from '@nestjs/typeorm';
import { RecentSearch } from '../../database/entity/recent-search.entity';
import { Repository } from 'typeorm';

export class RecentSearchRepository {
  constructor(
    @InjectRepository(RecentSearch)
    private recentSearchRepository: Repository<RecentSearch>,
  ) {}

  async findRecentSearchListByUUID(uuid: string): Promise<RecentSearch[]> {
    return await this.recentSearchRepository.find({
      where: {
        uuid,
      },
      order: {
        createdAt: 'DESC', // 최신 순 정렬
      },
    });
  }

  async createRecentSearch(uuid: string, shopName: string): Promise<RecentSearch> {
    return await this.recentSearchRepository.create({
      uuid,
      shopName,
    });
  }

  async saveRecentSearch(recentSearch) {
    return await this.recentSearchRepository.save(recentSearch);
  }

  async checkRecentSearchByShopName(uuid: string, shopName: string): Promise<RecentSearch> {
    return await this.recentSearchRepository.findOne({
      where: {
        uuid,
        shopName,
      },
    });
  }

  async deleteRecentSearch(uuid: string, shopName: string): Promise<void> {
    await this.recentSearchRepository.delete({
      uuid,
      shopName,
    });
  }
}
