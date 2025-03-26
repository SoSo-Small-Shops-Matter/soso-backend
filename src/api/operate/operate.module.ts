import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperatingHours } from 'src/database/entity/operating-hours.entity';
import { OperateRepository } from './operate.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OperatingHours])],
  providers: [OperateRepository],
  exports: [OperateRepository],
})
export class OperateModule {}
