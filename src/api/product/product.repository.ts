import { InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductMapping } from 'src/database/entity/product_mapping.entity';
import { Repository } from 'typeorm';

export class ProductRepository {
  constructor(
    @InjectRepository(ProductMapping)
    private productMappingRepository: Repository<ProductMapping>, // ProductRepository 주입
  ) {}

  async saveProducts(productMappings) {
    try {
      return await this.productMappingRepository.save(productMappings);
    } catch (err) {
      console.error('Product/saveProductsByShopId Error', err);
      throw new InternalServerErrorException();
    }
  }
}
