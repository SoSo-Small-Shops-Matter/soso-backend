import { InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductMapping } from 'src/database/entity/product_mapping.entity';
import { Repository } from 'typeorm';
import { LoggerService } from '../logger/logger.service';

export class ProductRepository {
  constructor(
    @InjectRepository(ProductMapping)
    private productMappingRepository: Repository<ProductMapping>, // ProductRepository 주입
    private readonly loggerService: LoggerService,
  ) {}

  async saveProducts(productMappings) {
    try {
      return await this.productMappingRepository.save(productMappings);
    } catch (err) {
      this.loggerService.warn(`Product/ saveProducts Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }
}
