import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Wishlist } from "./wishlist.entity";

@Entity()
export class User extends BaseEntity {
    
    @PrimaryColumn()
    uuid: string;
    
    @Column({
        unique:true,
        nullable:true,
    })
    nickName: string;

    @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
    wishlists: Wishlist[]; // 사용자가 소유한 위시리스트 목록
}
