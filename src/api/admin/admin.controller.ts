import { Body, Controller, Delete, Get, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
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
import { AdminGuard } from '../../common/gurad/admin.guard';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
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
  async allowSubmitProducts(@GetUUID() uuid: string, @Body() allowSubmitProducts: AllowSubmitProducts) {
    this.checkAdmin(uuid);
    return new SuccessResponseDTO(await this.adminService.allowSubmitProduct(allowSubmitProducts));
  }

  @Delete('/products')
  async rejectSubmitProducts(@GetUUID() uuid: string, @Body() rejectSubmitProducts: RejectSubmitProducts) {
    this.checkAdmin(uuid);
    return new SuccessResponseDTO(await this.adminService.rejectSubmitProduct(rejectSubmitProducts));
  }

  @Get('/operatings')
  async getSubmitOperatings(@GetUUID() uuid: string) {
    this.checkAdmin(uuid);
    return new SuccessResponseDTO(await this.adminService.getAllSubmitOperatings());
  }

  @Put('/operatings')
  async allowSubmitOperating(@GetUUID() uuid: string, @Body() allowSubmitOperatingInfo: AllowSubmitOperatingInfo) {
    this.checkAdmin(uuid);
    return new SuccessResponseDTO(await this.adminService.allowSubmitOperatingInfo(allowSubmitOperatingInfo));
  }

  @Delete('/operatings')
  async rejectSubmitOperating(@GetUUID() uuid: string, @Body() rejectSubmitOperatingInfo: RejectSubmitOperatingInfo) {
    this.checkAdmin(uuid);
    return new SuccessResponseDTO(await this.adminService.rejectSubmitOperatingInfo(rejectSubmitOperatingInfo));
  }

  @Get('/shops')
  async getSubmitNewShops(@GetUUID() uuid: string) {
    this.checkAdmin(uuid);
    return new SuccessResponseDTO(await this.adminService.getAllNewShops());
  }

  @Put('/shops')
  async allowSubmitNewShops(@GetUUID() uuid: string, @Body() allowSubmitNewShop: AllowSubmitNewShop) {
    this.checkAdmin(uuid);
    return new SuccessResponseDTO(await this.adminService.allowNewShop(allowSubmitNewShop));
  }

  @Delete('/shops')
  async rejectSubmitNewShops(@GetUUID() uuid: string, @Body() rejectSubmitShop: RejectSubmitNewShop) {
    this.checkAdmin(uuid);
    return new SuccessResponseDTO(await this.adminService.rejectNewShop(rejectSubmitShop));
  }
}
