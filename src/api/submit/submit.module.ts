import { Module } from '@nestjs/common';
import { SubmitController } from './submit.controller';
import { SubmitService } from './submit.service';
import { SubmitShop } from 'src/database/entity/submit-shop.entity';
import { SubmitOperatingHours } from 'src/database/entity/submit-operating-hours.entity';
import { SubmitProduct } from 'src/database/entity/submit-product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmitRepository } from './submit.repository';
import { SubmitProductMapping } from 'src/database/entity/submit-product_mapping.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([SubmitShop,SubmitOperatingHours,SubmitProduct,SubmitProductMapping]),AuthModule],
  controllers: [SubmitController],
  providers: [SubmitService,SubmitRepository],
})
export class SubmitModule {}
