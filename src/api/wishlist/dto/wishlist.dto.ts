import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class ShopIdDto{
    @IsNumber()
    @IsNotEmpty()
    shopId:number;
}

export class ShopIdParamDto {
    @Type(() => Number)
    shopId: number;
}
