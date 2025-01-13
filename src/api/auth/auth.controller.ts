import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SuccessResponseDTO } from 'src/common/response/response.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
  
    @Get('/google')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        return new SuccessResponseDTO(req.user.token);
    }
}
