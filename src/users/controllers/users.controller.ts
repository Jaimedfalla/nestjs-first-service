import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto, UserToProjectDto, UserUpdateDto } from '../dtos/user.dto';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('users')
@UseGuards(AuthGuard,RolesGuard)
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('register')
  public async registerUser(@Body() body:UserDto)
  {
    return await this.service.createUser(body);
  }

  @Post('add-to-project')
  public async addToProject(@Body() body:UserToProjectDto){
    return this.service.relationToProject(body)
  }

  @Roles('ADMIN')
  @Get('all')
  public async findAll(){
    return await this.service.findUsers();
  }

  @Get(':id')
  public async findUserById(@Param('id') id:string){
    return await this.service.findUserById(id);
  }

  @Put('edit/:id')
  public async updateUser(@Param('id') id:string,@Body() body:UserUpdateDto){
    return await this.service.updateUser(body,id);
  }

  @Delete('delete/:id')
  public async deleteUser(@Param('id') id:string){
    return await this.service.deleteUser(id);
  }
}
