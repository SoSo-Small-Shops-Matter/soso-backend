import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from './auth.service';
import * as config from 'config';
import { JwtService } from '@nestjs/jwt';

const googleConfig = config.get('google');

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: AuthService,
    private jwtService: JwtService // JwtService 주입
  ) {
    super({
      clientID: googleConfig.CLIENT_ID,
      clientSecret: googleConfig.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, emails } = profile;
    const email = emails[0].value;

    let user = await this.userService.findById(id);
    if (!user) {
      // 사용자가 없을 경우 회원가입 진행
      user = await this.userService.googleUserSignup(id, email);
    }

    // JWT 생성 및 반환
    const payload = { uuid: user.userId };
    const token = this.jwtService.sign(payload);

    return { token }; // 사용자와 토큰 반환
  }
}
