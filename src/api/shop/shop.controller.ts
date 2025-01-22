import { Body, Controller, Get, Param, Put, Query, ValidationPipe } from '@nestjs/common';
import { ShopService } from './shop.service';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { ShopIdParamDto, UpdateShopProductsDto } from './dto/submit.dto';

@Controller('shop')
export class ShopController {
    constructor(private shopService:ShopService){}

    @Get('/')
    async getShopWithin1Km(
        @Query('lat') lat: number,
        @Query('lng') lng: number,
    ){
        return new SuccessResponseDTO(await this.shopService.findShopsWithin1Km(lat,lng));
    }

    @Put('/')
    async updateShopProduct(
        @Body() updateShopProductsDto:UpdateShopProductsDto,
    ){
        return new SuccessResponseDTO(await this.shopService.updateShopProduct(updateShopProductsDto));
    }
    
    @Get('/search')
    async getSearchPageShop(
        @Query('lat') lat: number,
        @Query('lng') lng: number,
    ){
        return new SuccessResponseDTO(await this.shopService.findShopsWithin1KmAndSortByReviewCount(lat,lng));
    }

    @Get('/:shopId')
    async getShopByShopId(
        // 파라미터로 들어오는 shopId는 String 타입인데, 이를 Number로 사용하기 위해 강제 형변환을 시킴
        @Param(new ValidationPipe({ transform: true })) params: ShopIdParamDto,
    ){
        const { shopId } = params;
        return new SuccessResponseDTO(await this.shopService.findShopByShopId(shopId));
    }
}
