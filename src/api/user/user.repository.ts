import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/database/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private userReposiotry:Repository<User>
    ) {}
    
    async findUserByUUID(uuid:string){
        try{
            return await this.userReposiotry.findOne({ where:{uuid} });
        }catch(err){
            console.error("Error find user By Id:", err); // 에러 로그 추가
            throw new InternalServerErrorException();
        }
    }
    async findUserByNickName(nickName: string){
        try{
            const existNickName = await this.userReposiotry.findOne({ where: { nickName } });
            return !!existNickName; // 닉네임 존재 여부를 boolean으로 반환
        }catch(err){
            console.error("Error findUserNickname :", err); // 에러 로그 추가
            throw new InternalServerErrorException();
        }
    }
    async createUser(uuid:string){
        try {
            const user = await this.userReposiotry.create({
                uuid,
            });
            return await this.userReposiotry.save(user); 
        } catch (err) {
            console.error("Error saving user:", err); // 에러 로그 추가
            throw new InternalServerErrorException('User signup failed');
        }
    }
    async updateNickName(uuid:string, nickName:string){
        try{
            const newNickName = await this.userReposiotry.update({uuid},{nickName});
            return newNickName.affected > 0;
        }catch(err){
            console.error("Error setNickName :", err); // 에러 로그 추가
            throw new InternalServerErrorException();
        }
    }
}
