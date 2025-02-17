import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  // 백엔드 테스트용 -> 제거 예정
  @Get('/google')
  @UseGuards(AuthGuard('google'))
  googleOAuthLogin(@Res() res, @Req() req) {
    res.cookie('access_token', req.user.access_token, {
      httpOnly: true, // JavaScript에서 접근 불가 (보안 강화)
      secure: true, // HTTPS에서만 쿠키 전송
      sameSite: 'None', // 다른 도메인에서도 쿠키 전송 가능 (CORS 대응)
      domain: 'soso-client-soso-web.vercel.app',
      path: '/', // 전체 경로에서 쿠키 사용 가능
    });

    res.cookie('refresh_token', req.user.refresh_token, {
      httpOnly: true, // JavaScript에서 접근 불가 (보안 강화)
      secure: true, // HTTPS에서만 쿠키 전송
      sameSite: 'None', // 다른 도메인에서도 쿠키 전송 가능 (CORS 대응)
      domain: 'soso-client-soso-web.vercel.app',
      path: '/', // 전체 경로에서 쿠키 사용 가능
    });
    return res.redirect('https://soso-client-soso-web.vercel.app/');
  }

  @Get('/test')
  async devTestAPI(@Res() res) {
    const payload = { uuid: '102784937796556996262' };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: jwtConfig.access_token_secret,
      expiresIn: jwtConfig.access_token_expiresIn,
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: jwtConfig.refresh_token_secret,
      expiresIn: jwtConfig.refresh_token_expiresIn,
    });

    res.cookie('access_token', access_token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true, // HTTPS 환경에서 필요
      path: '/',
    });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true, // HTTPS 환경에서 필요
      path: '/',
    });

    return res.json({
      success: true,
    });
  }

  @Post('/refresh')
  async refreshAPI(@Res() res, @Req() req) {
    const { refresh_token } = req.cookies;
    const { access_token } = await this.authService.refresh(refresh_token);

    if (process.env.NODE_ENV === 'prd') {
      // prd용
      res.cookie('access_token', access_token, {
        httpOnly: true, // JavaScript에서 접근 불가 (보안 강화)
        secure: true, // HTTPS에서만 쿠키 전송
        sameSite: 'None', // 다른 도메인에서도 쿠키 전송 가능 (CORS 대응)
        path: '/', // 전체 경로에서 쿠키 사용 가능
      });
    } else {
      // dev용
      res.cookie('access_token', access_token, {
        httpOnly: true,
        sameSite: 'None',
        secure: true, // HTTPS 환경에서 필요
        path: '/',
      });
    }

    return res.json({
      success: true,
    });
  }
}
