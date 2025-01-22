import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from 'src/database/entity/shop.entity';
import { ShopRepository } from './shop.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Shop]),AuthModule],
    controllers: [ShopController],
    providers: [ShopService,ShopRepository],
    exports:[ShopRepository],
})
export class ShopModule {}
