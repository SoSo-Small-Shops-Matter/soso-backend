// import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { Shop } from './shop.entity';
//
// @Entity('shop_report')
// export class ShopReport {
//   @PrimaryGeneratedColumn()
//   id: number;
//
//   @Column()
//   user: string;
//
//   @Column() //
//   status: number;
//
//   @Column({ default: null }) // status가 기타일 경우 Text가 들어감
//   text: string;
//
//   @OneToMany(() => Shop, (shop) => shop.id)
//   shop: Shop;
// }
