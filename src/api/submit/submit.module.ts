import { Module, forwardRef } from '@nestjs/common';
import { SubmitController } from './submit.controller';
import { SubmitService } from './submit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmitRepository } from './submit.repository';
import { AuthModule } from '../auth/auth.module';
import { ShopModule } from '../shop/shop.module';
import { Region } from 'src/database/entity/region.entity';
import { SubmitUserRecord } from 'src/database/entity/submit-user.entity';
import { Shop } from 'src/database/entity/shop.entity';
import { OperatingHours } from 'src/database/entity/operating-hours.entity';
import { Product } from 'src/database/entity/product.entity';
import { ProductMapping } from 'src/database/entity/product_mapping.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Shop,OperatingHours,Product,ProductMapping,Region,SubmitUserRecord]),
    AuthModule,
    forwardRef(() => ShopModule),
  ],
  controllers: [SubmitController],
  providers: [SubmitService,SubmitRepository],
  exports: [SubmitRepository]
})
export class SubmitModule {}
