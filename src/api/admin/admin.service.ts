import { Injectable, NotFoundException } from '@nestjs/common';
import { SubmitRepository } from '../submit/submit.repository';
import {
  RejectSubmitProducts,
  AllowSubmitProducts,
  AllowSubmitOperatingInfo,
  RejectSubmitOperatingInfo,
  AllowSubmitNewShop,
  RejectSubmitNewShop,
} from './dto/admin.dto';
import { SubmitNewShopResponseDTO, SubmitOperatingsResponseDTO, SubmitProductsResponseDTO } from './dto/admin-response';
import { AdminTransactionsRepository } from '../transactions/admin.repository';

@Injectable()
export class AdminService {
  constructor(
    private submitRepository: SubmitRepository,
    private adminTransactionsRepository: AdminTransactionsRepository,
  ) {}

  async getAllSubmitProducts() {
    const submitUserProducts = await this.submitRepository.findAllSubmitProducts();
    return submitUserProducts.map(SubmitProductsResponseDTO.fromEntity);
  }

  async allowSubmitProduct(allowSubmitProducts: AllowSubmitProducts) {
    const { submitId, userUUID, shopId } = allowSubmitProducts;
    await this.adminTransactionsRepository.allowSubmitProduct(submitId, userUUID, shopId);
  }

  async rejectSubmitProduct(rejectSubmitProducts: RejectSubmitProducts) {
    const { submitId, userUUID, shopId, rejectMessage } = rejectSubmitProducts;
    await this.adminTransactionsRepository.rejectSubmitProduct(submitId, userUUID, shopId, rejectMessage);
  }

  async getAllSubmitOperatings() {
    const submitUserOperatings = await this.submitRepository.findAllSubmitOperatings();
    return submitUserOperatings.map(SubmitOperatingsResponseDTO.fromEntity);
  }

  async allowSubmitOperatingInfo(allowSubmitOperatingInfo: AllowSubmitOperatingInfo) {
    const { submitId, userUUID, shopId, operatingId } = allowSubmitOperatingInfo;
    await this.adminTransactionsRepository.allowSubmitOperatingInfo(submitId, userUUID, shopId, operatingId);
  }

  async rejectSubmitOperatingInfo(rejectSubmitOperatingInfo: RejectSubmitOperatingInfo) {
    const { submitId, userUUID, operatingId, rejectMessage } = rejectSubmitOperatingInfo;
    await this.adminTransactionsRepository.rejectSubmitOperatingInfo(submitId, userUUID, operatingId, rejectMessage);
  }

  async getAllNewShops() {
    const submitUserNewShops = await this.submitRepository.findAllSubmitNewShops();
    return submitUserNewShops.map(SubmitNewShopResponseDTO.fromEntity);
  }

  async allowNewShop(allowSubmitNewShop: AllowSubmitNewShop) {
    const { submitId, userUUID, newShopId } = allowSubmitNewShop;
    await this.adminTransactionsRepository.allowNewShop(submitId, userUUID, newShopId);
  }

  async rejectNewShop(rejectSubmitNewShop: RejectSubmitNewShop) {
    const { submitId, userUUID, newShopId, rejectMessage } = rejectSubmitNewShop;
    await this.adminTransactionsRepository.rejectNewShop(submitId, userUUID, newShopId, rejectMessage);
  }
}
