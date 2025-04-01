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
import { ProductRepository } from '../product/product.repository';
import { OperateRepository } from '../operate/operate.repository';
import { ShopRepository } from '../shop/shop.repository';

@Injectable()
export class AdminService {
  constructor(
    private submitRepository: SubmitRepository,
    private productRepository: ProductRepository,
    private operateRepository: OperateRepository,
    private shopRepository: ShopRepository,
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

  async allowSubmitProduct(allowSubmitProducts: AllowSubmitProducts) {
    const { submitId, userUUID, shopId } = allowSubmitProducts;
    const PRODUCTS_TYPE = 0;
    // 해당 유저가 제출한 submit status를 완료로 바꾸기 (status:1)
    const userSubmitData = await this.submitRepository.findSubmitBySubmitIdAndType(submitId, PRODUCTS_TYPE, userUUID);
    if (!userSubmitData) throw new NotFoundException('Not Found User Submit Record');
    userSubmitData.status = 1; // success;
    await this.submitRepository.saveSubmit(userSubmitData);

    // shopId로 product_mapping 테이블을 서칭해서 현재 type:0 인 정보 delete하기
    const usingProductsMapping = await this.productRepository.findAllUsingProductMappingsByShopId(shopId);
    if (usingProductsMapping.length === 0) throw new NotFoundException('Not Found Products Mapping');
    usingProductsMapping.map(async (data) => {
      await this.productRepository.deleteProducts(data.id);
    });

    // 유저의 uuid와 shopId로 product_mapping 테이블을 서칭해서 유저가 제안한 products의 type 0으로 업데이트하기
    const submitProductMappings = await this.productRepository.findAllSubmitProductMappingsByShopIdAndUUID(shopId, userUUID);
    if (submitProductMappings.length === 0) throw new NotFoundException('Not Found Submit Products Mapping');
    submitProductMappings.map(async (data) => {
      await this.productRepository.updateToUsingProduct(data.id);
    });
    return;
  }

  async rejectSubmitProduct(rejectSubmitProducts: RejectSubmitProducts) {
    const { submitId, userUUID, shopId, rejectMessage } = rejectSubmitProducts;
    const PRODUCTS_TYPE = 0;
    // 해당 유저가 제출한 submit status를 거절로 바꾸기 (status:2)
    const userSubmitData = await this.submitRepository.findSubmitBySubmitIdAndType(submitId, PRODUCTS_TYPE, userUUID);
    if (!userSubmitData) throw new NotFoundException('Not Found User Submit Record');
    userSubmitData.status = 2; // reject;
    userSubmitData.rejectMessage = rejectMessage;
    await this.submitRepository.saveSubmit(userSubmitData);

    // shopId와 userUUID를 통해 유저가 제보한 판매목록 데이터 지우기
    await this.productRepository.deleteAllSubmitProductMappingsByShopIdAndUUID(shopId, userUUID);
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

  async allowSubmitOperatingInfo(allowSubmitOperatingInfo: AllowSubmitOperatingInfo) {
    const { submitId, userUUID, shopId, operatingId } = allowSubmitOperatingInfo;
    const OPERATING_INFO_TYPE = 1;

    // 해당 유저가 제출한 submit status를 완료로 바꾸기 (status:1)
    const userSubmitData = await this.submitRepository.findSubmitBySubmitIdAndType(submitId, OPERATING_INFO_TYPE, userUUID);
    if (!userSubmitData) throw new NotFoundException('Not Found User Submit Record');
    userSubmitData.status = 1; // success
    await this.submitRepository.saveSubmit(userSubmitData);

    // shopId로 operatingHours 테이블을 서칭해서 현재 type:0 인 정보 delete하기
    await this.operateRepository.deleteUsingOperatingByShopId(shopId);

    // 유저의 uuid와 shopId로 operatingHours 테이블을 서칭해서 유저가 제안한 operatingHours의 type 0으로 업데이트하기
    await this.operateRepository.updateToUsingOperating(operatingId);
  }

  async rejectSubmitOperatingInfo(rejctSubmitOperatingInfo: RejectSubmitOperatingInfo) {
    const { submitId, userUUID, operatingId, rejectMessage } = rejctSubmitOperatingInfo;
    const OPERATING_INFO_TYPE = 1;

    // 해당 유저가 제출한 submit status를 완료로 바꾸기 (status:1)
    const userSubmitData = await this.submitRepository.findSubmitBySubmitIdAndType(submitId, OPERATING_INFO_TYPE, userUUID);
    if (!userSubmitData) throw new NotFoundException('Not Found User Submit Record');
    userSubmitData.status = 2; // reject
    userSubmitData.rejectMessage = rejectMessage;
    await this.submitRepository.saveSubmit(userSubmitData);

    // operatingId 데이터를 통해 사용자가 제안한 운영정보 데이터 삭제하기
    await this.operateRepository.deleteSubmitOperatingByOperatingId(operatingId);
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

  async allowNewShop(allowSubmitNewShop: AllowSubmitNewShop) {
    const { submitId, userUUID, newShopId } = allowSubmitNewShop;
    const NEW_SHOP_TYPE = 0;
    // 해당 유저가 제출한 submit status를 완료로 바꾸기 (status:1)
    const userSubmitData = await this.submitRepository.findSubmitBySubmitIdAndType(submitId, NEW_SHOP_TYPE, userUUID);
    if (!userSubmitData) throw new NotFoundException('Not Found User Submit Record');
    userSubmitData.status = 1; // success
    await this.submitRepository.saveSubmit(userSubmitData);
    // 해당 shopId를 통해 shop 테이블의 type = 0으로 업데이트(사용한다는 뜻)
    await this.shopRepository.updateToUsingShop(newShopId);
  }

  async rejectNewShop(rejectSubmitNewShop: RejectSubmitNewShop) {
    const { submitId, userUUID, newShopId, rejectMessage } = rejectSubmitNewShop;
    const NEW_SHOP_TYPE = 0;

    // 해당 유저가 제출한 submit status를 완료로 바꾸기 (status:2)
    const userSubmitData = await this.submitRepository.findSubmitBySubmitIdAndType(submitId, NEW_SHOP_TYPE, userUUID);
    if (!userSubmitData) throw new NotFoundException('Not Found User Submit Record');
    userSubmitData.status = 2; // reject
    userSubmitData.rejectMessage = rejectMessage;
    userSubmitData.shop = null;
    await this.submitRepository.saveSubmit(userSubmitData);

    // 사용자가 제안한 소풉샵 Shop 제거
    await this.shopRepository.deleteShop(newShopId);

    // 사용자가 제안한 소품샵 productMapping 제거
    await this.productRepository.deleteProductsByShopId(newShopId);
  }
}
