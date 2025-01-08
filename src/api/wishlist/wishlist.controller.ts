import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { WishlistService } from './wishlist.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('wishlist')
@UseGuards(AuthGuard('jwt'))
export class WishlistController {
    constructor(private wishlistService:WishlistService){}

    @Get('/')
    async getWishlist(
        @Req() req: any
    ){
        const uuid = req.user.uuid;
        return new SuccessResponseDTO(await this.wishlistService.getWishlistByUUID(req.user.uuid));
    }

    @Post('/')
    async addWishlist(
        @Req() req: any,
        @Body() body: any
    ){
        const uuid = req.user.uuid;
        const shopId = body.shopId;
        return new SuccessResponseDTO(await this.wishlistService.addWishlistByShopIdAndUUID(shopId,uuid));
    }

    @Get('/:shopId')
    async checkShopInUserWishlist(
        @Req() req: any,
        @Param('shopId') shopId: string,
    ){
        const { uuid } = req.user;
        return new SuccessResponseDTO(await this.wishlistService.isShopInUserWishlist(Number(shopId),uuid));
    }
}
