import { Injectable } from '@nestjs/common';
import { RecentSearchRepository } from './recent-search.repository';
import { DeleteRecentSearchDTO } from './dto/recent-search.dto';
import { RecentSearchDTO } from './dto/recent-search-response.dto';

@Injectable()
export class RecentSearchService {
  constructor(private readonly recentSearchRepository: RecentSearchRepository) {}
  async getRecentSearch(uuid: string | null) {
    if (!uuid) return [];
    const result = await this.recentSearchRepository.findRecentSearchListByUUID(uuid);
    return result.map(RecentSearchDTO.fromEntity);
  }

  async deleteRecentSearch(uuid: string, deleteRecentSearchDTO: DeleteRecentSearchDTO) {
    const { shopName } = deleteRecentSearchDTO;
    await this.recentSearchRepository.deleteRecentSearch(uuid, shopName);
  }

  async deleteAllRecentSearch(uuid: string) {
    await this.recentSearchRepository.deleteAllRecentSearch(uuid);
  }
}
