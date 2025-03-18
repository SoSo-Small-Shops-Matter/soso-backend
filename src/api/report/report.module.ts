import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewReport } from '../../database/entity/review-report.entity';
import { ReportRepository } from './report.repository';
import { ReviewModule } from '../review/review.module';
import { ShopReport } from '../../database/entity/shop-report.entity';
import { ShopModule } from '../shop/shop.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewReport, ShopReport]), ReviewModule, ShopModule],
  controllers: [ReportController],
  providers: [ReportService, ReportRepository],
})
export class ReportModule {}
