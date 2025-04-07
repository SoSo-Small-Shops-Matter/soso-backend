import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { SaveWishListDTO } from './dto/wishlist.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Post('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  async addWishlist(@Req() req: any, @Body() saveWishListDto: SaveWishListDTO) {
    const { uuid } = req.user;
    await this.wishlistService.addWishlistByShopIdAndUUID(saveWishListDto, uuid);
  }
}
