import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ShopModule } from '../shop/shop.module';
import { OperateModule } from '../operate/operate.module';

@Module({
  imports:[ShopModule,OperateModule],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
