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
      const newProducts = await this.productMappingRepository.create(productMappings);
      return await this.productMappingRepository.save(newProducts);
    } catch (err) {
      this.loggerService.warn(`Product/ saveProducts Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async deleteProducts(productMappingId: number) {
    try {
      return await this.productMappingRepository.delete({ id: productMappingId });
    } catch (err) {
      this.loggerService.warn(`Product/ deleteProducts Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async updateToUsingProduct(productMappingId: number) {
    try {
      return await this.productMappingRepository.update({ id: productMappingId }, { type: 0 });
    } catch (err) {
      this.loggerService.warn(`Product/updateProducts Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async findAllUsingProductMappingsByShopId(shopId: number) {
    try {
      return await this.productMappingRepository.find({
        where: {
          shopId: shopId,
          type: 0, // 사용중인
        },
      });
    } catch (err) {
      this.loggerService.warn(`Product/ findProductMappingsByShopId Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async findAllSubmitProductMappingsByShopIdAndUUID(shopId: number, uuid: string) {
    try {
      return await this.productMappingRepository.find({
        where: {
          shopId: shopId,
          type: 1,
          user: uuid,
        },
      });
    } catch (err) {
      this.loggerService.warn(`Product/ findAllSubmitProductMappingsByShopIdAndUUID Error: ${err}`);
      throw new InternalServerErrorException();
    }
  }
}
