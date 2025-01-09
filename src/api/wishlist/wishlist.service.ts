import { Injectable } from '@nestjs/common';
import { WishlistRepository } from './wishlist.repository';

@Injectable()
export class WishlistService {
    constructor(private wishlistRepository:WishlistRepository){}

    async getWishlistByUUID(uuid:string){
        const userWishlists = await this.wishlistRepository.findWishlistByUUID(uuid);
        const result = userWishlists.map((data)=>{
            return data.shop;
        });
        return result;
    }

    async addWishlistByShopIdAndUUID(shopId:number,uuid:string){
        const wishlist = await this.wishlistRepository.findWishlistByShopIdAndUUID(shopId,uuid);
        if(wishlist){
            return await this.wishlistRepository.deleteWishlistByWishlistId(wishlist.id);
        }
        return await this.wishlistRepository.addWishlistByShopIdAndUUID(shopId,uuid);
    }

    async isShopInUserWishlist(shopId:number,uuid:string){
        const result = await this.wishlistRepository.isShopInUserWishlist(shopId,uuid);
        return result ? true : false;
    }
}
