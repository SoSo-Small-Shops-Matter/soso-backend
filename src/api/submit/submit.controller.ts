import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('submit')
@UseGuards(AuthGuard('jwt'))
export class SubmitController {
    constructor(private submitService: SubmitService){}

    @Get('/')
    async getAllShop(){
        return new SuccessResponseDTO(await this.submitService.findAllShop());
    }
    @Post('/')
    async submitNewShop(
        @Body() body:any
    ){
        return new SuccessResponseDTO( await this.submitService.createNewShop(body));
    }
    @Post('/operating')
    async submitShopOperatingHours(
        @Body() body:any
    ){
        const { operatingData, shopId } = body;
        return new SuccessResponseDTO( await this.submitService.validateAndUpdateOperatingHours(operatingData,shopId)); 
    }

    @Get('/operating')
    async getWaitForAllowShopOperatingHours(){
        return new SuccessResponseDTO( await this.submitService.findValidateOperatingHours()); 
    }
}
