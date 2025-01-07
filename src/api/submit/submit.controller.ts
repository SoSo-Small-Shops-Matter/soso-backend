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
        await this.submitService.createNewShop(body);
        return new SuccessResponseDTO();
    }
}
