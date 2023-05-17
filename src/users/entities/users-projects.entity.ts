import { Column, Entity, ManyToOne } from "typeorm";
import { UserEntity } from "./users.entity";
import { BaseEntity } from "../../config/base.entity";
import { ACCESS_LEVEL } from "../../constants/roles";
import { ProjectEntity } from "../../projects/entities/projects.entity";

@Entity({name:'users_projects'})
export class UsersProjectsEntity extends BaseEntity
{
    @Column({type: 'enum',enum: ACCESS_LEVEL})
    accessLevel:ACCESS_LEVEL;

    @ManyToOne(()=> UserEntity,user => user.projectsInclude)
    user:UserEntity;

    @ManyToOne(()=>ProjectEntity,project => project.usersInclude)
    project:ProjectEntity;
}