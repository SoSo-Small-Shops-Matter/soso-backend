import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity()
export class User extends BaseEntity {
    
    @PrimaryColumn()
    uuid: string = uuid();
    
    @Column({ unique: true })
    userId: string;

    @Column({ nullable: true})
    password: string;

}
