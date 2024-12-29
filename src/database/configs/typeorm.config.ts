import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/database/entity/user.entity";
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [User],
    synchronize: true,
}