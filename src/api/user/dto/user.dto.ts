import { IsNotEmpty, IsString } from "class-validator";

export class NickNameDto {
    @IsString()
    @IsNotEmpty()
    nickName: string;
}