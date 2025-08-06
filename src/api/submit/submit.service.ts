import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { SubmitRepository } from './submit.repository';
import { DeleteSubmitRecordParamDto, SubmitNewProductsDto, SubmitNewShopDto, SubmitShopOperatingHoursDto } from './dto/submit.dto';
import { ShopRepository } from '../shop/shop.repository';
import { RegionRepository } from '../region/region.repository';
import { SubmitTransactionsRepository } from '../transactions/submit.repository';
import { SubmitType } from 'src/common/enum/role.enum';

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

  async deleteSubmitRecord(deleteSubmitRecordParamDto: DeleteSubmitRecordParamDto, uuid: string): Promise<void> {
    const { submitId } = deleteSubmitRecordParamDto;
    const submitRecord = await this.submitRepository.findSubmitRecordById(submitId, uuid);

    switch (submitRecord.type) {
      case SubmitType.NewShop: // 최초 제보
        await this.submitTransactionsRepository.deleteShopSubmission(submitRecord.shop.id);
        break;
      case SubmitType.NewOperating: // 운영 정보 수정
        await this.submitTransactionsRepository.deleteOperatingHoursSubmission(submitId, submitRecord.operatingId);
        break;
      case SubmitType.NewProduct: // 판매 정보 수정
        await this.submitTransactionsRepository.deleteProductSubmission(submitRecord.shop.id, uuid);
        break;
      default:
        throw new NotFoundException('Invalid submit type');
    }
  }
}
