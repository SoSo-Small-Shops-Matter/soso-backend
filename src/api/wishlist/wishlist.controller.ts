import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { WishlistService } from './wishlist.service';
import { AuthGuard } from '@nestjs/passport';
import { SaveWishListDTO } from './dto/wishlist.dto';

@Controller('wishlist')
@UseGuards(AuthGuard('jwt'))
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Post('/')
  async addWishlist(@Req() req: any, @Body() saveWishListDto: SaveWishListDTO) {
    const { uuid } = req.user;
    await this.wishlistService.addWishlistByShopIdAndUUID(saveWishListDto, uuid);
    return new SuccessResponseDTO();
  }
}
