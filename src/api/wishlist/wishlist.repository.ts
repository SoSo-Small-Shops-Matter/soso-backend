import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from 'src/database/entity/wishlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishlistRepository{
    constructor(
        @InjectRepository(Wishlist)
        private whishlistRepository:Repository<Wishlist>
    ) {}
    
    async findWishlistByShopIdAndUUID(shopId:number, uuid:string){
        try{
            return await this.whishlistRepository.findOne({
                where:{
                    user: { uuid }, 
                    shop: { id: shopId }, 
                },
                relations: ['user', 'shop'],
            });
        }catch(err){
            console.error(err);
            throw new InternalServerErrorException();
        }
    }

    async deleteWishlistByWishlistId(wishlistId:number){
        try{
            return  await this.whishlistRepository.delete({
                id:wishlistId,
            });
        }catch(err){
            console.error(err);
            throw new InternalServerErrorException();
        }
    }

    async addWishlistByShopIdAndUUID(shopId:number, uuid:string){
        try{
            return  await this.whishlistRepository.save({
                user: { uuid }, // User 엔티티와 연결
                shop: { id: shopId }, // Shop 엔티티와 연결
            });
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
                relations: ['user', 'shop', 'shop.region'],
            });
            return userWishlists;
        }catch(err){
            console.error(err);
            throw new InternalServerErrorException();
        }
    }

    async isShopInUserWishlist(shopId:number,uuid:string){
        try{
            const wishlist = await this.whishlistRepository.findOne({
                where:{
                    user: { uuid }, 
                    shop: { id: shopId }, 
                },
                relations: ['user', 'shop'],
            });
            return wishlist;
        }catch(err){
            console.error(err);
            throw new InternalServerErrorException();
        }
    }
}
