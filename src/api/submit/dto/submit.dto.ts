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

    mondayHours?: string;

    tuesdayHours?: string;

    wednesdayHours?: string;

    thursdayHours?: string;

    fridayHours?: string;

    saturdayHours?: string;

    sundayHours?: string;  
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