export class ShopInfoDTO {
  id: number;
  name: string;
  location: string;

  constructor(id: number, name: string, location: string) {
    this.id = id;
    this.name = name;
    this.location = location;
  }
}

export class UserInfoDTO {
  uuid: string;
  name: string;

  constructor(uuid: string, name: string) {
    this.uuid = uuid;
    this.name = name;
  }
}

export class ProductMappingDTO {
  id: number;
  name: string;
  type: number;
  user: string;

  constructor(id: number, name: string, type: number, user: string) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.user = user;
  }
}
export class OperatingHourDTO {
  id: number;
  type: number;
  day: string;
  open: string;
  close: string;

  constructor(id: number, type: number, day: string, open: string, close: string) {
    this.id = id;
    this.type = type;
    this.day = day;
    this.open = open;
    this.close = close;
  }
}

export class SubmitProductsResponseDTO {
  submitId: number;
  shop: ShopInfoDTO;
  user: UserInfoDTO;
  originalProductMappings: ProductMappingDTO[];
  newProductMappings: ProductMappingDTO[];

  constructor(
    submitId: number,
    shop: ShopInfoDTO,
    user: UserInfoDTO,
    originalProductMappings: ProductMappingDTO[],
    newProductMappings: ProductMappingDTO[],
  ) {
    this.submitId = submitId;
    this.shop = shop;
    this.user = user;
    this.originalProductMappings = originalProductMappings;
    this.newProductMappings = newProductMappings;
  }

  static fromEntity(submit: any): SubmitProductsResponseDTO {
    const shop = new ShopInfoDTO(submit.shop.id, submit.shop.name, submit.shop.location);
    const user = new UserInfoDTO(submit.user.uuid, submit.user.nickName);
    const productMappings = submit.shop?.productMappings ?? [];
    const original = productMappings.filter((p) => p.type === 0).map((p) => new ProductMappingDTO(p.id, p.name, p.type, p.user));
    const updated = productMappings
      .filter((p) => p.type === 1 && p.user === submit.user.uuid)
      .map((p) => new ProductMappingDTO(p.id, p.name, p.type, p.user));

    return new SubmitProductsResponseDTO(submit.id, shop, user, original, updated);
  }
}

export class SubmitOperatingsResponseDTO {
  submitId: number;
  shop: ShopInfoDTO;
  user: UserInfoDTO;
  originalOperating: OperatingHourDTO[] | null;
  newOperating: OperatingHourDTO[] | null;

  constructor(
    submitId: number,
    shop: ShopInfoDTO,
    user: UserInfoDTO,
    originalOperating: OperatingHourDTO[] | null,
    newOperating: OperatingHourDTO[] | null,
  ) {
    this.submitId = submitId;
    this.shop = shop;
    this.user = user;
    this.originalOperating = originalOperating;
    this.newOperating = newOperating;
  }

  static fromEntity(submit: any): SubmitOperatingsResponseDTO {
    const shop = new ShopInfoDTO(submit.shop.id, submit.shop.name, submit.shop.location);
    const user = new UserInfoDTO(submit.user.uuid, submit.user.nickName);
    const operatings = submit.shop?.operatingHours ?? [];
    const original = operatings.filter((o) => o.type === 0).map((o) => new OperatingHourDTO(o.id, o.type, o.day, o.open, o.close));
    const updated = operatings
      .filter((o) => o.type === 1 && o.id === submit.operatingId)
      .map((o) => new OperatingHourDTO(o.id, o.type, o.day, o.open, o.close));

    return new SubmitOperatingsResponseDTO(submit.id, shop, user, original.length ? original : null, updated.length ? updated : null);
  }
}

export class SubmitNewShopResponseDTO {
  submitId: number;
  shop: ShopInfoDTO;
  user: UserInfoDTO;
  operating: OperatingHourDTO[];
  products: ProductMappingDTO[];

  constructor(submitId: number, shop: ShopInfoDTO, user: UserInfoDTO, operating: OperatingHourDTO[], products: ProductMappingDTO[]) {
    this.submitId = submitId;
    this.shop = shop;
    this.user = user;
    this.operating = operating;
    this.products = products;
  }

  static fromEntity(submit: any): SubmitNewShopResponseDTO {
    const shop = new ShopInfoDTO(submit?.shop?.id, submit?.shop?.name, submit?.shop?.location);
    const user = new UserInfoDTO(submit?.user?.uuid, submit?.user?.nickName);

    const operating = (submit?.shop?.operatingHours ?? []).map((o) => new OperatingHourDTO(o.id, o.type, o.day, o.open, o.close));
    const products = (submit?.shop?.productMappings ?? []).map((p) => new ProductMappingDTO(p.id, p.name, p.type, p.user));

    return new SubmitNewShopResponseDTO(submit?.id, shop, user, operating, products);
  }
}
