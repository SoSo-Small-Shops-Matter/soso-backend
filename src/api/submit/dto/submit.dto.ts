import { IsInt, IsNotEmpty } from "class-validator";

export class SubmitShopOperatingHoursDto {
    @IsInt()
    @IsNotEmpty()
    shopId:number;

    @IsNotEmpty()
    operatingHours:OperatingHours;
}

export class SubmitNewShopDto {
    @IsNotEmpty()
    shop:SubmitShop;

    operatingHours?:OperatingHours;

    products?: Products[];
}

export interface OperatingHours {
    phoneNumber?: string;

    time: string;

    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
    saturday?: boolean;
    sunday?: boolean;
}

export interface SubmitShop {
    name: string;

    lat: number;

    lng: number;
    
    location: string;
}

export interface Products {
    id: number;
}