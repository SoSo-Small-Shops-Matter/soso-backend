import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { NickNameDto } from './dto/user.dto';
import { UserService } from './user.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(private userService:UserService){}

    @Post('/nickname')
    async checkNickName(
        @Body() nickNameDto:NickNameDto,
        @Req() req,
    ){
        const { nickName } = nickNameDto;
        const { uuid } = req.user;
        return new SuccessResponseDTO(await this.userService.findUserNickname(nickName,uuid));
    }

    @Put('/nickname')
    async updateNickName(
        @Body() nickNameDto:NickNameDto,
        @Req() req,
    ){
        const { nickName } = nickNameDto;
        const { uuid } = req.user;
        return new SuccessResponseDTO(await this.userService.setNickName(nickName,uuid));
    }
}
