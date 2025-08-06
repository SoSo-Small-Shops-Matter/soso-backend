import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecentSearch } from '../../database/entity/recent-search.entity';
import { RecentSearchRepository } from './recent-search.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RecentSearch])],
  providers: [RecentSearchRepository],
  exports: [RecentSearchRepository],
})
export class RecentSearchModule {}
