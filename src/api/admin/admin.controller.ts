import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
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
import { GetUUID } from '../../common/deco/get-user.deco';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly configService: ConfigService,
  ) {}

  private checkAdmin(uuid: string) {
    if (uuid !== this.configService.get<string>('ADMIN_UUID')) {
      throw new UnauthorizedException();
    }
  }

  @Get('/products')
  async getSubmitProducts(@GetUUID() uuid: string) {
    this.checkAdmin(uuid);
    return new SuccessResponseDTO(await this.adminService.getAllSubmitProducts());
  }

  @Put('/products')
  @HttpCode(HttpStatus.NO_CONTENT)
  async allowSubmitProducts(@GetUUID() uuid: string, @Body() allowSubmitProducts: AllowSubmitProducts) {
    this.checkAdmin(uuid);
    await this.adminService.allowSubmitProduct(allowSubmitProducts);
  }

  @Delete('/products')
  @HttpCode(HttpStatus.NO_CONTENT)
  async rejectSubmitProducts(@GetUUID() uuid: string, @Body() rejectSubmitProducts: RejectSubmitProducts) {
    this.checkAdmin(uuid);
    await this.adminService.rejectSubmitProduct(rejectSubmitProducts);
  }

  @Get('/operatings')
  async getSubmitOperatings(@GetUUID() uuid: string) {
    this.checkAdmin(uuid);
    return new SuccessResponseDTO(await this.adminService.getAllSubmitOperatings());
  }

  @Put('/operatings')
  @HttpCode(HttpStatus.NO_CONTENT)
  async allowSubmitOperating(@GetUUID() uuid: string, @Body() allowSubmitOperatingInfo: AllowSubmitOperatingInfo) {
    this.checkAdmin(uuid);
    await this.adminService.allowSubmitOperatingInfo(allowSubmitOperatingInfo);
  }

  @Delete('/operatings')
  @HttpCode(HttpStatus.NO_CONTENT)
  async rejectSubmitOperating(@GetUUID() uuid: string, @Body() rejectSubmitOperatingInfo: RejectSubmitOperatingInfo) {
    this.checkAdmin(uuid);
    await this.adminService.rejectSubmitOperatingInfo(rejectSubmitOperatingInfo);
  }

  @Get('/shops')
  async getSubmitNewShops(@GetUUID() uuid: string) {
    this.checkAdmin(uuid);
    return new SuccessResponseDTO(await this.adminService.getAllNewShops());
  }

  @Put('/shops')
  @HttpCode(HttpStatus.NO_CONTENT)
  async allowSubmitNewShops(@GetUUID() uuid: string, @Body() allowSubmitNewShop: AllowSubmitNewShop) {
    this.checkAdmin(uuid);
    await this.adminService.allowNewShop(allowSubmitNewShop);
  }

  @Delete('/shops')
  @HttpCode(HttpStatus.NO_CONTENT)
  async rejectSubmitNewShops(@GetUUID() uuid: string, @Body() rejectSubmitShop: RejectSubmitNewShop): Promise<void> {
    this.checkAdmin(uuid);
    await this.adminService.rejectNewShop(rejectSubmitShop);
  }
}
