import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../database/entity/user.entity';
import { Repository } from 'typeorm';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: jwtConfig.secret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (req && req.cookies) {
            console.log(req.cookies);
            return req.cookies['access_token']; // ✅ 쿠키에서 JWT 추출
          }
          return null;
        },
      ]),
    });
  }

  async validate(payload: any) {
    const { uuid } = payload;
    const user: User = await this.userRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
