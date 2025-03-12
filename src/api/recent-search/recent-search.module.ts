import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecentSearch } from '../../database/entity/recent-search.entity';
import { RecentSearchRepository } from './recent-search.repository';
import { RecentSearchController } from './recent-search.controller';
import { RecentSearchService } from './recent-search.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecentSearch])],
  controllers: [RecentSearchController],
  providers: [RecentSearchRepository, RecentSearchService],
  exports: [RecentSearchRepository],
})
export class RecentSearchModule {}
