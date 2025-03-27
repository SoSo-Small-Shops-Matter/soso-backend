import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SuccessResponseDTO } from '../../common/response/response.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/products')
  async getSubmitProducts() {
    return new SuccessResponseDTO(await this.adminService.getAllSubmitProducts());
  }

  @Get('/operatings')
  async getSubmitOperatings() {
    return new SuccessResponseDTO(await this.adminService.getAllSubmitOperatings());
  }

  @Get('/shops')
  async getSubmitNewShops() {
    return new SuccessResponseDTO(await this.adminService.getAllNewShops());
  }
}
