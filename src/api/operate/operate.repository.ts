import { InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OperatingHours } from 'src/database/entity/operating-hours.entity';
import { Repository } from 'typeorm';
import { LoggerService } from '../logger/logger.service';

export class OperateRepository {
  constructor(
    @InjectRepository(OperatingHours)
    private operatingRepository: Repository<OperatingHours>, // OperatingHoursRepository 주입
    private readonly loggerService: LoggerService,
  ) {}

  async saveOperatingByShopId(operatingData, shopId) {
    try {
      return await this.operatingRepository.save({
        shop: { id: shopId },
        type: 1,
        ...operatingData,
      });
    } catch (err) {
      this.loggerService.warn(`Operating/ saveOperatingByShopId Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async validateAndCreateOperatingHours(shopId: number, operatingData) {
    try {
      return await this.operatingRepository.save({
        shop: { id: shopId },
        type: 1,
        ...operatingData,
      });
    } catch (err) {
      this.loggerService.warn(`Operating/ validateAndCreateOperatingHours Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }
}
