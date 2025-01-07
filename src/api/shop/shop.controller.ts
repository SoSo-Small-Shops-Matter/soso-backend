import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ShopService } from './shop.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';

@Controller('shop')
export class ShopController {
    constructor(private shopService:ShopService){}

    @Get('/')
    async getAllShop(){
        return new SuccessResponseDTO(await this.shopService.findAllShop());
    }

    @Patch('/')
    async updateShopProduct(
        @Body() body:any,
    ){
        const { productData, shopId } = body;
        return new SuccessResponseDTO(await this.shopService.updateShopProduct(productData,shopId));
    }

    @Get('/:shopId')
    async getShopByShopId(
        @Param('shopId') shopId: string,
    ){
        const shopIdAsNumber = Number(shopId); // 숫자로 변환
        return new SuccessResponseDTO(await this.shopService.findShopByShopId(shopIdAsNumber));
    }
}
