import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { SaveWishListDTO } from './dto/wishlist.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GetUUID } from '../../common/deco/get-user.deco';
import { SuccessNoResultResponseDTO } from '../../common/response/response.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Wishlist')
@ApiBearerAuth('JWT-auth')
@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Post('/')
  @ApiOperation({
    summary: '소품샵 찜하기',
    description: '찜하기 리스트에 해당 소품샵을 넣습니다.',
  })
  @ApiOkResponse({
    description: '찜하기 성공',
    type: SuccessNoResultResponseDTO,
  })
  async addWishlist(@GetUUID() uuid: string, @Body() saveWishListDto: SaveWishListDTO) {
    await this.wishlistService.addWishlistByShopIdAndUUID(saveWishListDto, uuid);
    return new SuccessNoResultResponseDTO();
  }
}
