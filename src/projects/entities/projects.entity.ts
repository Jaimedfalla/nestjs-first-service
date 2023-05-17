import { BaseEntity } from "../../config/base.entity";
import { IProject } from "../../interfaces/project.interface";
import { UsersProjectsEntity } from "../../users/entities/users-projects.entity";
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name:'projects'})
export class ProjectEntity extends BaseEntity implements IProject
{
    @Column()
    name: string;
    
    @Column()
    description: string;

    @OneToMany(()=>UsersProjectsEntity,usersProjects => usersProjects.project)
    usersInclude:UsersProjectsEntity[]
}