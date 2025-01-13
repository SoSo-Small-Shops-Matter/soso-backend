import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class PostReviewDto {
    @IsInt()
    @IsNotEmpty()
    shopId:number;

    @IsString()
    @IsNotEmpty()
    content:string;
}