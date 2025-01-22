import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { User } from 'src/database/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports:[forwardRef(() => AuthModule),TypeOrmModule.forFeature([User]),AwsModule],
  controllers: [UserController],
  providers: [UserService,UserRepository],
  exports:[UserService,UserRepository],
})
export class UserModule {}
