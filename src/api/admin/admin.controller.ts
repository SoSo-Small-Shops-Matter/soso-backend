import { Controller, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService){}

    @Get('/report/:id')
    async getReportedNonexistentShops(
        @Param('id') report: number
    ){
        return new SuccessResponseDTO(await this.adminService.findReportedShops(report));
    }

    @Get('/submit/:type')
    async getSubmitShop(
        @Param('type') type: number,
    ){
        return new SuccessResponseDTO(await this.adminService.findSubmitShops(type));
    }

}
