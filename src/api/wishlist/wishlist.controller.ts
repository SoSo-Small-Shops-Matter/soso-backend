import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { SaveWishListDTO } from './dto/wishlist.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GetUUID } from '../../common/deco/get-user.deco';
import { SuccessResponseDTO } from '../../common/response/response.dto';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Post('/')
  async addWishlist(@GetUUID() uuid: string, @Body() saveWishListDto: SaveWishListDTO) {
    return new SuccessResponseDTO(await this.wishlistService.addWishlistByShopIdAndUUID(saveWishListDto, uuid));
  }
}
