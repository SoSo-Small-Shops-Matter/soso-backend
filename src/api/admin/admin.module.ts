import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ShopModule } from '../shop/shop.module';
import { SubmitModule } from '../submit/submit.module';

@Module({
  imports:[ShopModule,SubmitModule],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
