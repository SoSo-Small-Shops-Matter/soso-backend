import { Body, Controller, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { NickNameDto, UpdateProfileDto } from './dto/user.dto';
import { UserService } from './user.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(private userService:UserService){}

    @Get('/exist-nickname/:nickName')
    async checkNickName(
        @Param() nickNameDto:NickNameDto,
    ){
        const { nickName } = nickNameDto;
        return new SuccessResponseDTO(await this.userService.findUserNickName(nickName));
    }

    @Post('/nickname')
    async setNickName(
        @Body() nickNameDto:NickNameDto,
        @Req() req,
    ){
        const { nickName } = nickNameDto;
        const { uuid } = req.user;
        return new SuccessResponseDTO(await this.userService.findAndUpdateUserNickname(nickName,uuid));
    }

    @Put('/profile')
    @UseInterceptors(FileInterceptor('file'))
    async updateProfile(
        @Req() req,
        @Body() updateProfileDto?: UpdateProfileDto,
        @UploadedFile() file?: Express.Multer.File,
    ){
        const { nickName } = updateProfileDto;
        const { uuid } = req.user;
        return new SuccessResponseDTO(await this.userService.updateUserProfile(nickName,uuid,file));
    }
}
