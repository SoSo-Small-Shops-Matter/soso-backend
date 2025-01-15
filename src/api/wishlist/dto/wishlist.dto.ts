import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class ShopIdDto{
    @IsNumber()
    @IsNotEmpty()
    shopId:number;
}

export class ShopIdParamDto {
    @Type(() => Number)
    shopId: number;
}
