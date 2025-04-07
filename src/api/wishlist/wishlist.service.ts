import { Injectable } from '@nestjs/common';
import { WishlistRepository } from './wishlist.repository';
import { SaveWishListDTO } from './dto/wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(private wishlistRepository: WishlistRepository) {}

  async addWishlistByShopIdAndUUID(saveWishListDTO: SaveWishListDTO, uuid: string) {
    const { shopId } = saveWishListDTO;

    const wishlist = await this.wishlistRepository.findWishlistByShopIdAndUUID(shopId, uuid);
    if (wishlist) return await this.wishlistRepository.deleteWishlistByWishlistId(wishlist.id);

    return await this.wishlistRepository.addWishlistByShopIdAndUUID(shopId, uuid);
  }
}
