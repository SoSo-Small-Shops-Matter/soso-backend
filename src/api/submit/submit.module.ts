import { Module, forwardRef } from '@nestjs/common';
import { SubmitController } from './submit.controller';
import { SubmitService } from './submit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmitRepository } from './submit.repository';
import { ShopModule } from '../shop/shop.module';
import { SubmitUserRecord } from 'src/database/entity/submit-user.entity';
import { RegionModule } from '../region/region.module';
import { ProductModule } from '../product/product.module';
import { OperateModule } from '../operate/operate.module';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [
    forwardRef(() => ShopModule),
    TypeOrmModule.forFeature([SubmitUserRecord]),
    RegionModule,
    ProductModule,
    OperateModule,
    TransactionsModule,
  ],
  controllers: [SubmitController],
  providers: [SubmitService, SubmitRepository],
  exports: [SubmitRepository],
})
export class SubmitModule {}
