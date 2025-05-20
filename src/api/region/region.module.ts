import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from 'src/database/entity/region.entity';
import { RegionRepository } from './region.repository';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  providers: [RegionRepository, RegionService],
  exports: [RegionRepository],
  controllers: [RegionController],
})
export class RegionModule {}
