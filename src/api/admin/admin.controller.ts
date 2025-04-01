import { Body, Controller, Delete, Get, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Success204ResponseDTO, SuccessResponseDTO } from '../../common/response/response.dto';
import { AuthGuard } from '@nestjs/passport';
import * as config from 'config';
import { RejectSubmitProducts, AllowSubmitProducts, AllowSubmitOperatingInfo } from './dto/admin.dto';

const adminConfig = config.get('admin');

@Controller('admin')
@UseGuards(AuthGuard('jwt'))
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/products')
  async getSubmitProducts(@Req() req: any) {
    // 임시로 씀 -> 나중에 Role 추가해서 사용할 예정
    const { uuid } = req.user;
    if (uuid !== adminConfig.ADMIN_UUID) throw UnauthorizedException;
    return new SuccessResponseDTO(await this.adminService.getAllSubmitProducts());
  }

  @Put('/products')
  async allowSubmitProducts(@Req() req: any, @Body() allowSubmitProducts: AllowSubmitProducts) {
    const { uuid } = req.user;
    if (uuid !== adminConfig.ADMIN_UUID) throw UnauthorizedException;
    return new Success204ResponseDTO(await this.adminService.allowSubmitProduct(allowSubmitProducts));
  }

  @Delete('/products')
  async rejectSubmitProducts(@Req() req: any, @Body() rejectSubmitProducts: RejectSubmitProducts) {
    const { uuid } = req.user;
    if (uuid !== adminConfig.ADMIN_UUID) throw UnauthorizedException;
    return new Success204ResponseDTO(await this.adminService.rejectSubmitProduct(rejectSubmitProducts));
  }

  @Get('/operatings')
  async getSubmitOperatings(@Req() req: any) {
    const { uuid } = req.user;
    if (uuid !== adminConfig.ADMIN_UUID) throw UnauthorizedException;
    return new SuccessResponseDTO(await this.adminService.getAllSubmitOperatings());
  }

  @Put('/operatings')
  async allowSubmitOperating(@Req() req: any, @Body() allowSubmitOperatingInfo: AllowSubmitOperatingInfo) {
    const { uuid } = req.user;
    if (uuid !== adminConfig.ADMIN_UUID) throw UnauthorizedException;
    return new Success204ResponseDTO(await this.adminService.allowSubmitOperatingInfo(allowSubmitOperatingInfo));
  }

  @Get('/shops')
  async getSubmitNewShops(@Req() req: any) {
    const { uuid } = req.user;
    if (uuid !== adminConfig.ADMIN_UUID) throw UnauthorizedException;
    return new SuccessResponseDTO(await this.adminService.getAllNewShops());
  }
}
