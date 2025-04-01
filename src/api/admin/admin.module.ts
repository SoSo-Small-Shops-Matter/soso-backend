import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { SubmitModule } from '../submit/submit.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [SubmitModule, ProductModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
