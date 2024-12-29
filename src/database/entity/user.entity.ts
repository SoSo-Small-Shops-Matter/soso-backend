import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    
    @PrimaryColumn()
    uuid: string;
    
    @Column({
        unique:true,
        nullable:true,
    })
    nickName: string;

}
