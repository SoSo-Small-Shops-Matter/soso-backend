import { Injectable } from '@nestjs/common';
import { RecentSearchRepository } from './recent-search.repository';

@Injectable()
export class RecentSearchService {
  constructor(private readonly recentSearchRepository: RecentSearchRepository) {}
  async getRecentSearch(uuid: string | null) {
    if (!uuid) return [];
    return await this.recentSearchRepository.findRecentSearchListByUUID(uuid);
  }

  async deleteRecentSearch(uuid: string, shopName: string) {
    return await this.recentSearchRepository.deleteRecentSearch(uuid, shopName);
  }
}
