import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewReport } from '../../database/entity/review-report.entity';
import { ReportRepository } from './report.repository';
import { ShopReport } from '../../database/entity/shop-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewReport, ShopReport])],
  providers: [ReportRepository],
  exports: [ReportRepository],
})
export class ReportModule {}
