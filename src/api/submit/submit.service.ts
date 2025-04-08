import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { SubmitRepository } from './submit.repository';
import { SubmitNewShopDto, SubmitShopOperatingHoursDto } from './dto/submit.dto';
import { ShopRepository } from '../shop/shop.repository';
import { RegionRepository } from '../region/region.repository';
import { ProductRepository } from '../product/product.repository';
import { OperateRepository } from '../operate/operate.repository';

@Injectable()
export class SubmitService {
  constructor(
    private submitRepository: SubmitRepository,
    private regionRepository: RegionRepository,
    private productRepository: ProductRepository,
    private operateRepository: OperateRepository,
    private shopRepository: ShopRepository,
  ) {}

  async createNewShop(newShopData: SubmitNewShopDto, uuid: string): Promise<void> {
    const { shop, operatingHours, products } = newShopData;

    const region = await this.regionRepository.findRegionByLocation(shop.location);
    if (!region) throw new NotFoundException('check region location');

    const createShop = await this.shopRepository.createNewShop(shop, region.id);
    if (!createShop) throw new ConflictException();

    if (operatingHours) {
      await this.operateRepository.saveOperatingByShopId(operatingHours, createShop.id);
    }

    if (products) {
      const productMappings = products.map((product) => ({
        // shop: { id: createShop.id },
        product: { id: product.id },
        shopId: createShop.id,
        user: uuid,
      }));
      await this.productRepository.saveProducts(productMappings);
    }

    await this.submitRepository.createSubmitUserRecordByNewShop(uuid, createShop.id);
  }

  async validateAndUpdateOperatingHours(operatingData: SubmitShopOperatingHoursDto, uuid: string): Promise<void> {
    const { shopId, operatingHours } = operatingData;

    // 운영정보 업데이트시 해당 소품샵이 존재하는지 체크
    const shop = await this.shopRepository.findOnlyShopByShopId(shopId);
    if (!shop) throw new ConflictException('Not Exist Shop');

    const existData = await this.submitRepository.findUserSubmitRecordByType(uuid, shopId, 1);
    if (existData) throw new ConflictException('Exist Data');

    const newOperating = await this.operateRepository.validateAndCreateOperatingHours(shop.id, operatingHours);

    await this.submitRepository.createSubmitUserRecordByUpdateOperatingInfo(uuid, shop.id, newOperating.id);
  }

  async validateAndUpdateProducts(prodcutsData, uuid: string): Promise<void> {
    const { shopId, products } = prodcutsData;

    const shop = await this.shopRepository.findOnlyShopByShopId(shopId);
    if (!shop) throw new ConflictException('Not Exist Shop');

    const existData = await this.submitRepository.findUserSubmitRecordByType(uuid, shopId, 2);
    if (existData) throw new ConflictException('Exist Data');

    const productMappings = products.map((product) => ({
      shop: { id: shopId },
      shopId: shopId,
      productId: product.id,
      type: 1,
      user: uuid,
      product: { id: product.id },
    }));
    await this.productRepository.saveProducts(productMappings);

    await this.submitRepository.createSubmitUserRecordByUpdateProducts(uuid, shop.id);
  }
}
