import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SuccessResponseDTO } from '../../common/response/response.dto';
import { ConfigService } from '@nestjs/config';
import {
  RejectSubmitProducts,
  AllowSubmitProducts,
  AllowSubmitOperatingInfo,
  RejectSubmitOperatingInfo,
  AllowSubmitNewShop,
  RejectSubmitNewShop,
} from './dto/admin.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly configService: ConfigService,
  ) {}

  private isNotAdmin(uuid: string): boolean {
    return uuid !== this.configService.get<string>('ADMIN_UUID');
  }

  @Get('/products')
  async getSubmitProducts(@Req() req: any) {
    const { uuid } = req.user;
    if (this.isNotAdmin(uuid)) throw new UnauthorizedException();
    return new SuccessResponseDTO(await this.adminService.getAllSubmitProducts());
  }

  @Put('/products')
  @HttpCode(HttpStatus.NO_CONTENT)
  async allowSubmitProducts(@Req() req: any, @Body() allowSubmitProducts: AllowSubmitProducts) {
    const { uuid } = req.user;
    if (this.isNotAdmin(uuid)) throw new UnauthorizedException();
    await this.adminService.allowSubmitProduct(allowSubmitProducts);
  }

  @Delete('/products')
  @HttpCode(HttpStatus.NO_CONTENT)
  async rejectSubmitProducts(@Req() req: any, @Body() rejectSubmitProducts: RejectSubmitProducts) {
    const { uuid } = req.user;
    if (this.isNotAdmin(uuid)) throw new UnauthorizedException();
    await this.adminService.rejectSubmitProduct(rejectSubmitProducts);
  }

  @Get('/operatings')
  async getSubmitOperatings(@Req() req: any) {
    const { uuid } = req.user;
    if (this.isNotAdmin(uuid)) throw new UnauthorizedException();
    return new SuccessResponseDTO(await this.adminService.getAllSubmitOperatings());
  }

  @Put('/operatings')
  @HttpCode(HttpStatus.NO_CONTENT)
  async allowSubmitOperating(@Req() req: any, @Body() allowSubmitOperatingInfo: AllowSubmitOperatingInfo) {
    const { uuid } = req.user;
    if (this.isNotAdmin(uuid)) throw new UnauthorizedException();
    await this.adminService.allowSubmitOperatingInfo(allowSubmitOperatingInfo);
  }

  @Delete('/operatings')
  @HttpCode(HttpStatus.NO_CONTENT)
  async rejectSubmitOperating(@Req() req: any, @Body() rejectSubmitOperatingInfo: RejectSubmitOperatingInfo) {
    const { uuid } = req.user;
    if (this.isNotAdmin(uuid)) throw new UnauthorizedException();
    await this.adminService.rejectSubmitOperatingInfo(rejectSubmitOperatingInfo);
  }

  @Get('/shops')
  async getSubmitNewShops(@Req() req: any) {
    const { uuid } = req.user;
    if (this.isNotAdmin(uuid)) throw new UnauthorizedException();
    return new SuccessResponseDTO(await this.adminService.getAllNewShops());
  }

  @Put('/shops')
  @HttpCode(HttpStatus.NO_CONTENT)
  async allowSubmitNewShops(@Req() req: any, @Body() allowSubmitNewShop: AllowSubmitNewShop) {
    const { uuid } = req.user;
    if (this.isNotAdmin(uuid)) throw new UnauthorizedException();
    await this.adminService.allowNewShop(allowSubmitNewShop);
  }

  @Delete('/shops')
  @HttpCode(HttpStatus.NO_CONTENT)
  async rejectSubmitNewShops(@Req() req: any, @Body() rejectSubmitShop: RejectSubmitNewShop): Promise<void> {
    const { uuid } = req.user;
    if (this.isNotAdmin(uuid)) throw new UnauthorizedException();
    await this.adminService.rejectNewShop(rejectSubmitShop);
  }
}
