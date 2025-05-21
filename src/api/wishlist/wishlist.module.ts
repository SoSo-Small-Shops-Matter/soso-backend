import { Module } from '@nestjs/common';
import { WishlistRepository } from './wishlist.repository';
import { Wishlist } from 'src/database/entity/wishlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist])],
  providers: [WishlistRepository],
  exports: [WishlistRepository],
})
export class WishlistModule {}
