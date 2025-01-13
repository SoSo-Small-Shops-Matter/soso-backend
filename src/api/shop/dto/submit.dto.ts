import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class UpdateShopProductsDto {
    @IsInt()
    @IsNotEmpty()
    shopId:number;

    @IsNotEmpty()
    products: Products[];
}

export class ShopIdParamDto {
    @Type(() => Number)
    shopId: number;
}


export interface Products {
    id: number;
    
    name?: string;
}