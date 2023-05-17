import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../entities/projects.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { ProjectDto, ProjectUpdateDto } from '../dtos/project.dto';
import { ErrorManager } from 'src/utils/errors/error.manager';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(ProjectEntity)
        private readonly repository:Repository<ProjectEntity>
    ){}

    async createProject(body:ProjectDto):Promise<ProjectEntity>
    {
        try {
            const project:ProjectEntity = await this.repository.save(body);

            if(!project) throw new ErrorManager({
                type:'BAD_REQUEST',
                message:'No user found'
              });
        
              return project;
        } catch (error) {
            console.log('error: ',error);
            throw error;
        }
    }

    async findProjects():Promise<ProjectEntity[]>
    {
        try {
            return await this.repository.find();
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    async findProjectById(id:string):Promise<ProjectEntity>
    {
        try {
            return await this.repository.createQueryBuilder('projects')
                .leftJoinAndSelect('project.usersInclude','usersInclude')
                .leftJoinAndSelect('usersInclude.project', 'user')
                .where({id})
                .getOne();
        } catch (error) {
            throw error;
        }
    }

    async updateProject(body:ProjectUpdateDto, id:string):Promise<UpdateResult|undefined>
    {
        try {
            const result:UpdateResult = await this.repository.update(id,body);

            return result.affected===0?undefined:result;
        } catch (error) {
            throw error;
        }
    }

    async deleteProject(id:string):Promise<DeleteResult|undefined>
    {
        try {
            const result:DeleteResult = await this.repository.delete(id);

            return result.affected===0?undefined:result;
        } catch (error) {
            throw error;
        }
    }
}
