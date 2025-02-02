import { Controller, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService){}

    @Get('/report')
    async getReportedShops(){
        return new SuccessResponseDTO(await this.adminService.findReportedShops());
    }

    @Get('/submit')
    async getSubmitedShops(){
        return new SuccessResponseDTO(await this.adminService.findSubmitedShops());
    }
}
