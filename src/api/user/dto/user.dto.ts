import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class NickNameDto {
    @IsString()
    @IsNotEmpty()
    @Length(2, 10)
    nickName: string;
}

export class UpdateProfileDto {
    @IsOptional() 
    // @IsString()
    // @Length(2, 10)
    nickName?: string | null;
}