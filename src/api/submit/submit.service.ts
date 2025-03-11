import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { SubmitRepository } from './submit.repository';
import { SubmitNewShopDto, SubmitShopOperatingHoursDto } from './dto/submit.dto';
import { ShopRepository } from '../shop/shop.repository';
import { RegionRepository } from '../region/region.repository';
import { ProductRepository } from '../product/product.repository';
import { OperateRepository } from '../operate/operate.repository';
import { ProductMapping } from '../../database/entity/product_mapping.entity';

@Injectable()
export class SubmitService {
  constructor(
    private submitRepository: SubmitRepository,
    private regionRepository: RegionRepository,
    private productRepository: ProductRepository,
    private operateRepository: OperateRepository,
    private shopRepository: ShopRepository,
  ) {}

  async createNewShop(newShopData: SubmitNewShopDto, uuid: string) {
    const { shop, operatingHours, products } = newShopData;

    const region = await this.regionRepository.findRegionByLocation(shop.location);
    if (!region) {
      throw new NotFoundException('위치가 잘못됐습니다.');
    }

    const createShop = await this.shopRepository.createNewShop(shop, region.id);

    if (!createShop) {
      throw new ConflictException();
    }

    if (operatingHours) {
      await this.operateRepository.saveOperatingByShopId(operatingHours, createShop.id);
    }

    if (products) {
      const productMappings = products.map((product) => ({
        shop: { id: createShop.id },
        product: { id: product.id },
      }));
      await this.productRepository.saveProducts(productMappings);
    }

    const result = await this.submitRepository.createSubmitUserRecordByNewShop(uuid, createShop.id);

    return result;
  }

  async validateAndUpdateOperatingHours(operatingData: SubmitShopOperatingHoursDto, uuid: string) {
    const { shopId, operatingHours } = operatingData;

    // 운영정보 업데이트시 해당 소품샵이 존재하는지 체크
    const shop = await this.shopRepository.findOnlyShopByShopId(shopId);
    if (!shop) {
      throw new ConflictException('없는 소풉샵입니다.');
    }

    await this.operateRepository.validateAndCreateOperatingHours(shop.id, operatingHours);

    const result = await this.submitRepository.createSubmitUserRecordByUpdateOperatingInfo(uuid, shop.id);

    return result;
  }

  async validateAndUpdateProducts(prodcutsData, uuid: string) {
    const { shopId, products } = prodcutsData;

    const shop = await this.shopRepository.findOnlyShopByShopId(shopId);
    if (!shop) {
      throw new ConflictException('없는 소풉샵입니다.');
    }
    const productMappings = products.map((product) => ({
      shop: { id: shopId },
      type: 1,
      user: uuid,
      product: { id: product.id },
    }));

    await this.productRepository.saveProducts(productMappings);

    await this.submitRepository.createSubmitUserRecordByUpdateProducts(uuid, shop.id);
  }
}
