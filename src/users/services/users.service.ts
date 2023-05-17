import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDto, UserToProjectDto, UserUpdateDto } from '../dtos/user.dto';
import { ErrorManager } from 'src/utils/errors/error.manager';
import { UsersProjectsEntity } from '../entities/users-projects.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository:Repository<UserEntity>,
    @InjectRepository(UsersProjectsEntity)
    private readonly userProjectsRepository:Repository<UsersProjectsEntity>
  ){}

  async createUser(body:UserDto):Promise<UserEntity>{
    try {
      body.password = bcrypt.hashSync(body.password,+process.env.HASH_SALT);;
      const user:UserEntity = await this.userRepository.save(body);
      if(!user) throw new ErrorManager({
        type:'BAD_REQUEST',
        message:'No user found'
      });

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findUsers():Promise<UserEntity[]>{
    try {
      const users:UserEntity[] = await this.userRepository.find();
      
      if(users.length ===0) throw new ErrorManager({
        type:'BAD_REQUEST',
        message:'No users found'
      });

      return users;

    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findUserById(id:string):Promise<UserEntity>{
    try {
      const user:UserEntity = await this.userRepository.createQueryBuilder('user')
        .where({id})
        .leftJoinAndSelect('user.projectsInclude', 'projectsInclude')
        .leftJoinAndSelect('projectsInclude.project', 'project')
        .getOne();
      
      if(!user) throw new ErrorManager({
        type:'BAD_REQUEST',
        message:'No user found'
      });

      return user;
    } catch (error) {
      throw  ErrorManager.createSignatureError(error.message);
    }
  }

  async updateUser(body:UserUpdateDto,id:string):Promise<UpdateResult>{
    try {
      const user:UpdateResult = await this.userRepository.update(id,body);

      if(user.affected===0) throw new ErrorManager({
        type:'BAD_REQUEST',
        message:'No user found'
      });
      
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async deleteUser(id:string):Promise<DeleteResult | undefined>{
    try {
      const user:DeleteResult = await this.userRepository.delete(id);

      if(user.affected===0) throw new ErrorManager({
        type:'BAD_REQUEST',
        message:'No user found'
      });
      
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async relationToProject(body: UserToProjectDto) {
    try {
      return await this.userProjectsRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findBy({key,value}:{
    key:keyof UserDto,
    value:string
  }){
    try {
      const user:UserEntity = await this.userRepository.createQueryBuilder('user')
        .addSelect('user.password').where({[key]:value}).getOne();

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
