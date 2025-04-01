import { Injectable } from '@nestjs/common';
import { SubmitRepository } from '../submit/submit.repository';
import { UpdateSubmitProducts } from './dto/admin.dto';
import { ProductRepository } from '../product/product.repository';

@Injectable()
export class AdminService {
  constructor(
    private submitRepository: SubmitRepository,
    private productRepository: ProductRepository,
  ) {}

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

  async allowSubmitProduct(updateSubmitProducts: UpdateSubmitProducts) {
    const { submitId, userUUID, shopId } = updateSubmitProducts;
    // 해당 유저가 제출한 submit status를 완료로 바꾸기 (status:1)
    const userSubmitData = await this.submitRepository.findSubmitProductsBySubmitId(submitId);
    userSubmitData.status = 1; // success;
    await this.submitRepository.saveSubmit(userSubmitData);
    // shopId로 product_mapping 테이블을 서칭해서 현재 type:0 인 정보 delete하기
    const usingProductsMapping = await this.productRepository.findAllUsingProductMappingsByShopId(shopId);
    usingProductsMapping.map(async (data) => {
      await this.productRepository.deleteProducts(data.id);
    });
    // 유저의 uuid와 shopId로 product_mapping 테이블을 서칭해서 유저가 제안한 products의 type 0으로 업데이트하기
    const submitProductMappings = await this.productRepository.findAllSubmitProductMappingsByShopIdAndUUID(shopId, userUUID);
    submitProductMappings.map(async (data) => {
      await this.productRepository.updateToUsingProduct(data.id);
    });
    return;
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
