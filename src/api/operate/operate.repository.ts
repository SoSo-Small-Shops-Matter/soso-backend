import { InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OperatingHours } from "src/database/entity/operating-hours.entity";
import { Repository } from "typeorm";

export class OperateRepository {
    constructor(
        @InjectRepository(OperatingHours)
        private operatingRepository: Repository<OperatingHours>, // OperatingHoursRepository 주입
    ) {}

    async saveOperatingByShopId(operatingData,shopId){
        try{
            return await this.operatingRepository.save({
                shop: { id: shopId },
                type: 1,
                ...operatingData,
            })
        }catch(err){
            console.error("Operat/saveOperatingByShopId Error", err);
            throw new InternalServerErrorException();
        }
    }

    async validateAndCreateOperatingHours(shopId:number,operatingData){
        try{
            return await this.operatingRepository.save({
                shop: { id: shopId },
                type: 1,
                ...operatingData,
            });
        }catch(err){
            console.error("Operat/validateAndCreateOperatingHours Error", err);
            throw new InternalServerErrorException();
        }
    }

    async findSubmitedAllOperatings(){
        try{
            return await this.operatingRepository.find({
                where:{
                    type:1,
                },
                relations: ['shop']
            })
        }catch(err){
            console.error("Operat/findSubmitedAllOperatings Error",err);
            throw new InternalServerErrorException();
        }
    }
}