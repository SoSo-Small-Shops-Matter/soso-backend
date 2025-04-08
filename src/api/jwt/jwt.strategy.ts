import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../database/entity/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService, // ✅ ConfigService 주입
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      ignoreExpiration: true,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any) {
    const { uuid, exp, role } = payload;
    if (exp && Date.now() >= exp * 1000) {
      throw new UnauthorizedException('토큰이 만료되었습니다.');
    }

    const user: User = await this.userRepository.findOne({ where: { uuid } });
    if (!user) {
      this.loggerService.warn(`JWT/ 존재하지 않은 유저 로그인 : ${uuid}`);
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }
    return { uuid, role };
  }
}
