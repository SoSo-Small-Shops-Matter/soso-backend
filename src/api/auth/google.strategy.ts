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
    private jwtService: JwtService, // JwtService 주입
  ) {
    super({
      clientID: googleConfig.CLIENT_ID,
      clientSecret: googleConfig.CLIENT_SECRET,
      callbackURL: 'https://testhttpsserver.store/auth/google',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, photos, displayName } = profile;
    const photoUrl = photos[0]?.value;

    let user = await this.userService.findUserById(id);
    if (!user) {
      // 사용자가 없을 경우 회원가입 진행
      user = await this.userService.googleUserSignup(id, photoUrl, displayName);
    }
    // JWT 생성 및 반환
    const payload = { uuid: user.uuid };
    const token = this.jwtService.sign(payload);

    return { token }; // 사용자와 토큰 반환
  }
}
