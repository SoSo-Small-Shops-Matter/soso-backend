import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../../database/entity/image.entity';
import { User } from '../../database/entity/user.entity';
import { Wishlist } from '../../database/entity/wishlist.entity';
import { SubmitUserRecord } from '../../database/entity/submit-user.entity';
import { RecentSearch } from '../../database/entity/recent-search.entity';
import { DeleteUserTransactionsRepository } from './delete-user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Image, User, Wishlist, SubmitUserRecord, RecentSearch])],
  providers: [DeleteUserTransactionsRepository],
  exports: [DeleteUserTransactionsRepository],
})
export class TransactionsModule {}
