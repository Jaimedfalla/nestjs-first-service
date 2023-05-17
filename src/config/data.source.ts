import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { helpers } from '../utils/helpers';

const envFilePath = helpers.getEnvironmentFile();

ConfigModule.forRoot({
    envFilePath
});

const configService = new ConfigService();

const HOST = configService.get('DB_HOST');
const PORT = configService.get<number>('DB_PORT');
const USER = configService.get('DB_USER');
const PASSWORD = configService.get('DB_PASSWORD');
const DB = configService.get('DB_NAME');

export const DataSourceConfig:DataSourceOptions = {
    type:'postgres',
    host:           HOST,
    port:           PORT,
    username:       USER,
    password:       PASSWORD,
    database:       DB,
    entities:       [`${__dirname}/../**/**/*.entity{.ts,.js}`],
    migrations:     [`${__dirname}/../migrations/*{.ts,.js}`],
    synchronize:    false,
    migrationsRun:  true,
    logging:        false,
    namingStrategy: new SnakeNamingStrategy()
}

export const appDS = new DataSource(DataSourceConfig);