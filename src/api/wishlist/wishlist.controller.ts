import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { SaveWishListDTO } from './dto/wishlist.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GetUUID } from '../../common/deco/get-user.deco';
import { ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';
import { ApiDefaultResponses } from '../../common/deco/swagger-default.deco';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Post('/')
  @ApiOperation({ summary: '찜 목록 저장하기 API' })
  @ApiNoContentResponse()
  @ApiDefaultResponses()
  @HttpCode(HttpStatus.NO_CONTENT)
  async addWishlist(@GetUUID() uuid: string, @Body() saveWishListDto: SaveWishListDTO) {
    await this.wishlistService.addWishlistByShopIdAndUUID(saveWishListDto, uuid);
  }
}
