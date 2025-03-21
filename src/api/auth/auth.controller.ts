import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/google')
  async login(@Body() user: any) {
    return new SuccessResponseDTO(await this.authService.getUserData(user.code, user.redirectUri));
  }

  @Post('/refresh')
  async refresh(@Body() body: any) {
    const { refreshToken } = body;
    return new SuccessResponseDTO(await this.authService.refresh(refreshToken));
  }

  @Get('/test')
  async test() {
    return new SuccessResponseDTO(await this.authService.test());
  }
}
