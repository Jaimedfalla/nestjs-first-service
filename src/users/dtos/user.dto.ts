import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ACCESS_LEVEL, ROLES } from "../../constants/roles";
import { UserEntity } from "../entities/users.entity";
import { ProjectEntity } from "src/projects/entities/projects.entity";

export class UserDto
{
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;
    
    @IsNotEmpty()
    @IsNumber()
    age: number;
    
    @IsNotEmpty()
    @IsString()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @IsNotEmpty()
    @IsEnum(ROLES)
    role: ROLES;
}

export class UserUpdateDto
{
    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;
    
    @IsOptional()
    @IsNumber()
    age: number;
    
    @IsOptional()
    @IsString()
    email: string;
    
    @IsOptional()
    @IsString()
    username: string;
    
    @IsOptional()
    @IsString()
    password: string;
    
    @IsOptional()
    @IsEnum(ROLES)
    role: ROLES;
}

export class UserToProjectDto
{
    @IsNotEmpty()
    @IsUUID()
    user:UserEntity;

    @IsNotEmpty()
    @IsUUID()
    project:ProjectEntity;

    @IsNotEmpty()
    @IsEnum(ACCESS_LEVEL)
    accessLevel:ACCESS_LEVEL;
}