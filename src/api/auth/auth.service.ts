import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../../database/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
    
    async findById(id: string){
        try{
            const user = await this.userRepository.findOne({ where:{uuid:id} });
            return user;
        }catch(err){
            throw new InternalServerErrorException();
        }
    }
    async googleUserSignup(id: string, email: string) {
        try {
            const user = await this.userRepository.create({
                uuid: id,
                userId: email,
            });
            const result = await this.userRepository.save(user); 
            return result;
        } catch (err) {
            console.error("Error saving user:", err); // 에러 로그 추가
            throw new InternalServerErrorException('User signup failed');
        }
    }
}
