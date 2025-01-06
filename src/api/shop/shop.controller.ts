import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ShopService } from './shop.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';

@Controller('shop')
export class ShopController {
    constructor(private shopService:ShopService){}

    @Get('/')
    async getAllShop(){
        return new SuccessResponseDTO(await this.shopService.findAllShop());
    }

    @Get('/:shopId')
    async getShopByShopId(
        @Param('shopId') shopId: string,
    ){
        const shopIdAsNumber = Number(shopId); // 숫자로 변환
        return new SuccessResponseDTO(await this.shopService.findShopByShopId(shopIdAsNumber));
    }
}
