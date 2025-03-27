import { Injectable } from '@nestjs/common';
import { SubmitRepository } from '../submit/submit.repository';

@Injectable()
export class AdminService {
  constructor(private submitRepository: SubmitRepository) {}

  async getAllSubmitProducts() {
    const result = await this.submitRepository.findAllSubmitProducts();
    return result.map((submit) => ({
      shop: {
        name: submit.shop.name,
        location: submit.shop.location,
      },
      user: {
        uuid: submit.user.uuid,
        name: submit.user.nickName,
      },
      originalProductMappings: submit.shop?.productMappings?.filter((p) => p.type === 0) || [],
      newProductMappings: submit.shop?.productMappings?.filter((p) => p.type === 1 && p.user === submit.user.uuid) || [],
    }));
  }

  async getAllSubmitOperatings() {
    const result = await this.submitRepository.findAllSubmitOperatings();
    return result.map((submit) => ({
      shop: {
        name: submit.shop.name,
        location: submit.shop.location,
      },
      user: {
        uuid: submit.user.uuid,
        name: submit.user.nickName,
      },
      originalOperating: submit.shop?.operatingHours?.filter((p) => p.type === 0) || null,
      newOperating: submit.shop?.operatingHours?.filter((p) => p.type === 1 && p.id === submit.operatingId) || null,
    }));
  }

  async getAllNewShops() {
    const result = await this.submitRepository.findAllSubmitNewShops();
    return result.map((submit) => ({
      shop: {
        name: submit.shop.name,
        location: submit.shop.location,
      },
      user: {
        uuid: submit.user.uuid,
        name: submit.user.nickName,
      },
      operating: submit.shop.operatingHours,
      products: submit.shop?.productMappings,
    }));
  }
}
