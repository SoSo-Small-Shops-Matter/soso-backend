import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../../database/entity/user.entity";
import { Repository } from "typeorm";
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        super({
            secretOrKey:jwtConfig.secret,
            jwtFromRequest: ExtractJwt.fromExtractors([(request) => {
                // 쿠키에서 JWT 추출
                return request?.cookies?.accessToken || null;
            }]),
        });
    }

    async validate(payload: any) {
        const { userId } = payload;
        const user: User = await this.userRepository.findOne({ where: {userId} });

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}