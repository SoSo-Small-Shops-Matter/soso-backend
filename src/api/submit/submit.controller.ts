import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { SubmitNewShopDto, SubmitShopOperatingHoursDto } from './dto/submit.dto';

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
        @Body() newShopData: SubmitNewShopDto,
    ){
        return new SuccessResponseDTO( await this.submitService.createNewShop(newShopData));
    }
    @Post('/operating')
    async submitShopOperatingHours(
        @Body() operatingData: SubmitShopOperatingHoursDto,
    ){
        return new SuccessResponseDTO( await this.submitService.validateAndUpdateOperatingHours(operatingData)); 
    }

    @Get('/operating')
    async getWaitForAllowShopOperatingHours(){
        return new SuccessResponseDTO( await this.submitService.findValidateOperatingHours()); 
    }
}
