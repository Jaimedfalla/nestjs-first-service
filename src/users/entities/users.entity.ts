import { Column, Entity, OneToMany } from "typeorm";
import { IUser } from "../../interfaces/user.interface";
import { ROLES } from "../../constants/roles";

import { BaseEntity } from "../../config/base.entity";
import { UsersProjectsEntity } from "./users-projects.entity";
import { Exclude } from "class-transformer";

@Entity({name:'users'})
export class UserEntity extends BaseEntity implements IUser{
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    username: string;

    @Exclude()
    @Column()
    password: string;

    @Column({type:'enum',enum:ROLES})
    role: ROLES;

    @OneToMany(()=> UsersProjectsEntity,usersProjects => usersProjects.user)
    projectsInclude:UsersProjectsEntity[]
}