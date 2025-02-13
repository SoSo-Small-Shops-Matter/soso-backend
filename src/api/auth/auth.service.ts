import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private userRepository:UserRepository,
    ) {}
    
    async findUserById(uuid: string){
        return await this.userRepository.findUserByUUID(uuid);
    }
    async googleUserSignup(uuid: string, photoUrl:string, nickName:string) {
        return await this.userRepository.createUser(uuid,photoUrl,nickName);
    }
}
