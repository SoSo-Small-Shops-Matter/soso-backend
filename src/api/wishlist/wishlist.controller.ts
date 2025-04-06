import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { WishlistService } from './wishlist.service';
import { SaveWishListDTO } from './dto/wishlist.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Post('/')
  async addWishlist(@Req() req: any, @Body() saveWishListDto: SaveWishListDTO) {
    const { uuid } = req.user;
    await this.wishlistService.addWishlistByShopIdAndUUID(saveWishListDto, uuid);
    return new SuccessResponseDTO();
  }
}
