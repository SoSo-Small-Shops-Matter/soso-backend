import { Injectable } from '@nestjs/common';
import { RegionRepository } from './region.repository';

@Injectable()
export class RegionService {
  constructor(private readonly regionRepository: RegionRepository) {}

  async findAllRegions() { 
    const regionList = await this.regionRepository.findAllRegions();
    const result = regionList.map((region) => {
      return region.name;
    });
    return result;
  }
}