import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { BadRequestResponseDTO } from 'src/common/response/response.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private userRepository:UserRepository
    ) {}
    
    async findUserNickname(nickName: string, uuid: string){
        const existNickName = await this.userRepository.findUserByNickName(nickName);
        if (existNickName) {
            throw new ConflictException('Nickname already exists.');
        }
        await this.userRepository.updateNickName(uuid,nickName);
    }

    async setNickName(nickName: string, uuid: string){
        const existNickName = await this.userRepository.findUserByNickName(nickName);
        if (existNickName) {
            throw new ConflictException('Nickname already exists.');
        }
        
        const newNickName = await this.userRepository.updateNickName(uuid,nickName);
        if(newNickName.affected == 0){
            throw new InternalServerErrorException();
        }
    }
}
