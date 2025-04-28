import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { SubmitRepository } from './submit.repository';
import { SubmitNewProductsDto, SubmitNewShopDto, SubmitShopOperatingHoursDto } from './dto/submit.dto';
import { ShopRepository } from '../shop/shop.repository';
import { RegionRepository } from '../region/region.repository';
import { ProductRepository } from '../product/product.repository';
import { OperateRepository } from '../operate/operate.repository';
import { SubmitTransactionsRepository } from '../transactions/submit.repository';

@Injectable()
export class SubmitService {
  constructor(
    private submitRepository: SubmitRepository,
    private regionRepository: RegionRepository,
    private shopRepository: ShopRepository,
    private submitTransactionsRepository: SubmitTransactionsRepository,
  ) {}

  async createNewShop(newShopData: SubmitNewShopDto, uuid: string): Promise<void> {
    const region = await this.regionRepository.findRegionByLocation(newShopData.shop.location);
    if (!region) throw new NotFoundException('check region location');
    await this.submitTransactionsRepository.createNewShop(newShopData, region.id, uuid);
  }

  async validateAndUpdateOperatingHours(operatingData: SubmitShopOperatingHoursDto, uuid: string): Promise<void> {
    // 운영정보 업데이트시 해당 소품샵이 존재하는지 체크
    const shop = await this.shopRepository.findOnlyShopByShopId(operatingData.shopId);
    if (!shop) throw new ConflictException('Not Exist Shop');

    const existData = await this.submitRepository.findUserSubmitRecordByType(uuid, operatingData.shopId, 1);
    if (existData) throw new ConflictException('Exist Data');

    await this.submitTransactionsRepository.createOperatingHours(operatingData, uuid);
  }

  async validateAndUpdateProducts(prodcutsData: SubmitNewProductsDto, uuid: string): Promise<void> {
    const shop = await this.shopRepository.findOnlyShopByShopId(prodcutsData.shopId);
    if (!shop) throw new ConflictException('Not Exist Shop');

    const existData = await this.submitRepository.findUserSubmitRecordByType(uuid, prodcutsData.shopId, 2);
    if (existData) throw new ConflictException('Exist Data');

    await this.submitTransactionsRepository.createProducts(prodcutsData, uuid);
  }
}
