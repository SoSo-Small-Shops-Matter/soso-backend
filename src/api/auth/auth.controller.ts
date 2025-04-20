import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { GoogleAuthLoginDTO, RefreshTokenDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/google')
  async login(@Body() googleAuthLoginDTO: GoogleAuthLoginDTO) {
    return new SuccessResponseDTO(await this.authService.googleAuthLogin(googleAuthLoginDTO));
  }

  @Post('/refresh')
  async refresh(@Body() refreshTokenDTO: RefreshTokenDTO) {
    return new SuccessResponseDTO(await this.authService.refresh(refreshTokenDTO));
  }

  @Get('/test')
  async test() {
    return new SuccessResponseDTO(await this.authService.test());
  }
}
