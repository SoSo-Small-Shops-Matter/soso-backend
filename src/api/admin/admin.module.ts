import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { SubmitModule } from '../submit/submit.module';
import { ShopModule } from '../shop/shop.module';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [SubmitModule, ShopModule, TransactionsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
