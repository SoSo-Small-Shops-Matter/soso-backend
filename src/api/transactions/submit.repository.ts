import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { LoggerService } from '../logger/logger.service';
import { SubmitNewProductsDto, SubmitNewShopDto, SubmitShopOperatingHoursDto } from '../submit/dto/submit.dto';
import { SubmitUserRecord } from '../../database/entity/submit-user.entity';
import { Shop } from '../../database/entity/shop.entity';
import { OperatingHours } from '../../database/entity/operating-hours.entity';
import { ProductMapping } from '../../database/entity/product_mapping.entity';
import { SubmitStatus, SubmitType, UsingType } from '../../common/enum/role.enum';

@Injectable()
export class SubmitTransactionsRepository {
  constructor(
    private dataSource: DataSource,
    private loggerService: LoggerService,
  ) {}

  async createNewShop(newShopData: SubmitNewShopDto, regionId: number, uuid: string): Promise<void> {
    const { shop, operatingHours, products } = newShopData;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const shopRepo = queryRunner.manager.getRepository(Shop);
      const submitRepo = queryRunner.manager.getRepository(SubmitUserRecord);
      const operatingRepo = queryRunner.manager.getRepository(OperatingHours);
      const productRepo = queryRunner.manager.getRepository(ProductMapping);

      const createShop = await shopRepo.save({
        ...shop,
        type: SubmitType.NewShop,
        region: {
          id: regionId,
        },
      });

      if (operatingHours) {
        await operatingRepo.save({
          shop: { id: createShop.id },
          type: UsingType.Using,
          ...operatingHours,
        });
      }

      if (products) {
        const productMappings = products.map((product) => ({
          product: { id: product.id },
          shopId: createShop.id,
          user: uuid,
          type: UsingType.Using,
        }));
        await productRepo.save(productMappings);
      }

      await submitRepo.save({
        status: SubmitStatus.Pending,
        type: SubmitType.NewShop,
        user: {
          uuid,
        },
        shop: {
          id: createShop.id,
        },
      });

      await queryRunner.commitTransaction();
    } catch (err) {
      this.loggerService.warn(`Submit/ CreateShop Error: ${err}`);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  async createOperatingHours(operatingData: SubmitShopOperatingHoursDto, uuid: string) {
    const { shopId, operatingHours } = operatingData;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const submitRepo = queryRunner.manager.getRepository(SubmitUserRecord);
      const operatingRepo = queryRunner.manager.getRepository(OperatingHours);

      const newOperatingHours = await operatingRepo.save({
        shop: { id: shopId },
        type: UsingType.Verifying,
        ...operatingHours,
      });
      await submitRepo.save({
        status: SubmitStatus.Pending,
        type: SubmitType.NewOperating,
        user: {
          uuid,
        },
        shop: {
          id: shopId,
        },
        operatingId: newOperatingHours.id,
      });
      await queryRunner.commitTransaction();
    } catch (err) {
      this.loggerService.warn(`Submit/ CreateOperating Error: ${err}`);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  async createProducts(prodcutsData: SubmitNewProductsDto, uuid: string) {
    const { shopId, products } = prodcutsData;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const submitRepo = queryRunner.manager.getRepository(SubmitUserRecord);
    const productRepo = queryRunner.manager.getRepository(ProductMapping);

    try {
      const productMappings = products.map((product) => ({
        product: { id: product.id },
        shopId: shopId,
        user: uuid,
        type: UsingType.Verifying,
      }));
      await productRepo.save(productMappings);

      await submitRepo.save({
        status: SubmitStatus.Pending,
        type: SubmitType.NewProduct,
        user: {
          uuid,
        },
        shop: {
          id: shopId,
        },
      });
      await queryRunner.commitTransaction();
    } catch (err) {
      this.loggerService.warn(`Submit/ CreateProducts Error: ${err}`);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }
}
