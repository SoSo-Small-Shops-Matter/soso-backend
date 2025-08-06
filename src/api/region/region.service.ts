import { RegionRepository } from './region.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegionService {
  constructor(private regionRepository: RegionRepository) {}

  async findAllRegions() {
    const regionList = await this.regionRepository.findAllRegions();
    return regionList.map((region) => ({
      name: region.name,
    }));
  }
}
