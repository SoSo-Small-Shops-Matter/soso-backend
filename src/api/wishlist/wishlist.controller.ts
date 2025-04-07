import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { SaveWishListDTO } from './dto/wishlist.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GetUUID } from '../../common/deco/get-user.deco';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Post('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  async addWishlist(@GetUUID() uuid: string, @Body() saveWishListDto: SaveWishListDTO) {
    await this.wishlistService.addWishlistByShopIdAndUUID(saveWishListDto, uuid);
  }
}
