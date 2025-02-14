import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // 백엔드 테스트용 -> 제거 예정
  @Get('/google')
  @UseGuards(AuthGuard('google'))
  test(@Res() res, @Req() req) {
    res.cookie('access_token', req.user.token, {
      httpOnly: true, // JavaScript에서 접근 불가 (보안 강화)
      secure: true, // HTTPS에서만 쿠키 전송
      sameSite: 'None', // 다른 도메인에서도 쿠키 전송 가능 (CORS 대응)
      domain: '.soso-client-soso-web.vercel.app', // 도메인 설정
      path: '/', // 전체 경로에서 쿠키 사용 가능
    });
    return res.redirect('https://soso-client-soso-web.vercel.app/');
  }
}
