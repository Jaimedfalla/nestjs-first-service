import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDto } from '../dtos/project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private service: ProjectsService) {}

  @Post('create')
  public async registerUser(@Body() body:ProjectDto)
  {
    return await this.service.createProject(body);
  }

  @Get('all')
  public async findAll(){
    return await this.service.findProjects();
  }

  @Get(':id')
  public async findUserById(@Param('id') id:string){
    return await this.service.findProjectById(id);
  }

  @Put('edit/:id')
  public async updateProject(@Param('id') id:string,@Body() body:ProjectDto){
    return await this.service.updateProject(body,id);
  }

  @Delete('delete/:id')
  public async deleteProject(@Param('id') id:string){
    return await this.service.deleteProject(id);
  }
}
