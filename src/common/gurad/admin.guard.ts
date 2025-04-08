import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Role } from '../enum/role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService, // ✅ ConfigService 주입
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const ADMIN_UUID = this.configService.get<string>('ADMIN_UUID');
    return user.role === Role.Admin && user.uuid === ADMIN_UUID;
  }
}
