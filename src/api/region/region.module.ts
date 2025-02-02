import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from 'src/database/entity/region.entity';
import { RegionRepository } from './region.repository';

@Module({
    imports:[TypeOrmModule.forFeature([Region])],
    providers:[RegionRepository],
    exports:[RegionRepository],
})
export class RegionModule {}
