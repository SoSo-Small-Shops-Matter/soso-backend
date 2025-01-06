import { Body, Controller, Get, Post } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';

@Controller('submit')
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
        await this.submitService.createNewShop(body);
        return new SuccessResponseDTO();
    }
}
