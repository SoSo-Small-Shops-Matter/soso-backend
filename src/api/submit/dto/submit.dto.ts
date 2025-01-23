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

    mondayStartHours?: string;
    mondayEndHours?: string;

    tuesdayStartHours?: string;
    tuesdayEndHours?: string;

    wednesdayStartHours?: string;
    wednesdayEndHours?: string;

    thursdayStartHours?: string;
    thursdayEndHours?: string;

    fridayStartHours?: string;
    fridayEndHours?: string;

    saturdayStartHours?: string;
    saturdayEndHours?: string;

    sundayStartHours?: string;
    sundayEndHours?: string;
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