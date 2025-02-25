import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/google')
  async login(@Body() user: any) {
    const result = await this.authService.getUserData(user.code, user.redirectUri);
    return result;
  }

  @Post('/refresh')
  async refresh(@Req() req: Request) {
    const refreshToken = req.headers['authorization']?.split(' ')[1];
    return await this.authService.refresh(refreshToken);
  }
}
