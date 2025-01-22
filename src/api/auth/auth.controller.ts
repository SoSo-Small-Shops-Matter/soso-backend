import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SuccessResponseDTO } from 'src/common/response/response.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
  
    // 백엔드 테스트용 -> 제거 예정
    @Get('/google')
    @UseGuards(AuthGuard('google'))
    test(@Req() req) {
        return new SuccessResponseDTO(req.user.token);
    }

    @Post('/google')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        return new SuccessResponseDTO(req.user.token);
    }
}
