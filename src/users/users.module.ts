import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/users.entity';
import { UsersProjectsEntity } from './entities/users-projects.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,UsersProjectsEntity])],
  providers: [UsersService],
  controllers: [UsersController],
  exports:[UsersService,TypeOrmModule]
})
export class UsersModule {}
