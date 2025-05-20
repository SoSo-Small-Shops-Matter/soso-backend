import { Controller, Get } from '@nestjs/common';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { RegionService } from './region.service';

@Controller('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get('/')
  async getAllShopRegion() {
    return new SuccessResponseDTO(await this.regionService.findAllRegions());
  }
}
