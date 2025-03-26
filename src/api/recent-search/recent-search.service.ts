import { Injectable } from '@nestjs/common';
import { RecentSearchRepository } from './recent-search.repository';
import { DeleteRecentSearchDTO } from './dto/recent-search.dto';

@Injectable()
export class RecentSearchService {
  constructor(private readonly recentSearchRepository: RecentSearchRepository) {}
  async getRecentSearch(uuid: string | null) {
    if (!uuid) return [];
    return await this.recentSearchRepository.findRecentSearchListByUUID(uuid);
  }

  async deleteRecentSearch(uuid: string, deleteRecentSearchDTO: DeleteRecentSearchDTO) {
    const { shopName } = deleteRecentSearchDTO;
    return await this.recentSearchRepository.deleteRecentSearch(uuid, shopName);
  }

  async deleteAllRecentSearch(uuid: string) {
    return await this.recentSearchRepository.deleteAllRecentSearch(uuid);
  }
}
