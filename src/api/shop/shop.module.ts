import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { Shop } from 'src/database/entity/shop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopRepository } from './shop.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Shop])],
  controllers: [ShopController],
  providers: [ShopService,ShopRepository],
})
export class ShopModule {}
