import { InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Region } from "src/database/entity/region.entity";
import { Repository } from "typeorm";

export class RegionRepository {
    constructor(
        @InjectRepository(Region)
        private regionRepository: Repository<Region>,
    ){}
    
    async findRegionByLocation(location){
        try{
            const regionName = location[0] + location[1];
            return await this.regionRepository.findOne({
                where:{
                    name:regionName,
                }
            })
        }catch(err){
            console.error(err);
            throw new InternalServerErrorException();
        }
    }
}