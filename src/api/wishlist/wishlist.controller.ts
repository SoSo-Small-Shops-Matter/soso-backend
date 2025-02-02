import { Body, Controller, Get, Param, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { WishlistService } from './wishlist.service';
import { AuthGuard } from '@nestjs/passport';
import { ShopIdDto, ShopIdParamDto } from './dto/wishlist.dto';

@Controller('wishlist')
@UseGuards(AuthGuard('jwt'))
export class WishlistController {
    constructor(private wishlistService:WishlistService){}

    @Post('/')
    async addWishlist(
        @Req() req: any,
        @Body() shopIdDto:ShopIdDto
    ){
        const uuid = req.user.uuid;
        await this.wishlistService.addWishlistByShopIdAndUUID(shopIdDto,uuid)
        return new SuccessResponseDTO();
    }
}
