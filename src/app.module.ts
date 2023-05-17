import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { UtilsModule } from './utils/utils.module';
import { helpers } from './utils/helpers';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';

const envFile = helpers.getEnvironmentFile();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFile,
      isGlobal: true,
    }),
    UsersModule,
    TypeOrmModule.forRoot({...DataSourceConfig}),
    UtilsModule,
    ProjectsModule,
    AuthModule
  ],
})
export class AppModule {}
