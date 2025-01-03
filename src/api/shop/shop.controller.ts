import { Controller, Get } from '@nestjs/common';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
    constructor(private shopService:ShopService){}

    @Get('/')
    async getAllShop(){
        return this.shopService.findAllShop();
    }
}
