import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from 'src/database/entity/wishlist.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class WishlistRepository{
    constructor(
        @InjectRepository(Wishlist)
        private whishlistRepository:Repository<Wishlist>
    ) {}

    async addWishlistByShopIdAndUUID(shopId:number, uuid:string){
        try{
            const wishlistItem = await this.whishlistRepository.save({
                user: { uuid }, // User 엔티티와 연결
                shop: { id: shopId }, // Shop 엔티티와 연결
            });
            return wishlistItem;
        }catch(err){
            console.error(err);
            if(err.code == 'ER_DUP_ENTRY'){
                throw new ConflictException('이미 존재하는 데이터입니다');
            }
            throw new InternalServerErrorException();
        }
    }

    async findWishlistByUUID(uuid:string){
        try{
            const userWishlists = await this.whishlistRepository.find({
                where: { user: { uuid} },
                relations: ['user', 'shop'],
            });
            return userWishlists;
        }catch(err){
            console.error(err);
            throw new InternalServerErrorException();
        }
    }

    async deleteWishlistByShopIdAndUUID(shopId:number,uuid:string){
        return await this.whishlistRepository.delete({ user: {uuid}, shop: {id:shopId} });
    }
}
