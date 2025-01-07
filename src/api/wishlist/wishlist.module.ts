import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { WishlistRepository } from './wishlist.repository';
import { Wishlist } from 'src/database/entity/wishlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([Wishlist]),AuthModule],
  controllers: [WishlistController],
  providers: [WishlistService,WishlistRepository],
})
export class WishlistModule {}
