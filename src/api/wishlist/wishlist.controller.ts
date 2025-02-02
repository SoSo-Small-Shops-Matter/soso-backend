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

    @Get('/:shopId')
    async checkShopInUserWishlist(
        @Req() req: any,
        // 파라미터로 들어오는 shopId는 String 타입인데, 이를 Number로 사용하기 위해 강제 형변환을 시킴
        @Param(new ValidationPipe({ transform: true })) params: ShopIdParamDto,
    ){
        const { uuid } = req.user;
        const { shopId } = params;
        return new SuccessResponseDTO(await this.wishlistService.isShopInUserWishlist(shopId,uuid));
    }
}
