import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from 'src/users/entities/users.entity';
import { PayLoadToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {

    constructor(private readonly userService:UsersService){}

    async validateUser(username:string,password:string)
    {
        const userByUserName = await this.userService.findBy({
            key:'username',
            value:username
        });

        const userByEmail = await this.userService.findBy({
            key:'email',
            value:username
        });

        if(userByUserName)
        {
            const match = await bcrypt.compare(password,userByUserName.password);
            if(match) return userByUserName;
        }

        if(userByEmail )
        {
            const match =await bcrypt.compare(password,userByEmail.password);
            if(match) return userByEmail;
        }
    }

    signJWT({payload,secret,expires}:{payload:jwt.JwtPayload,secret:string,expires:number|string}):string
    {
        return jwt.sign(payload,secret,{expiresIn:expires});
    }

    async generateJWT(user:UserEntity):Promise<any>
    {
        const {id} = user;
        const userEntity = await this.userService.findUserById(id);
        const payload:PayLoadToken = {
            role:userEntity.role,
            sub:id
        }

        return {
            accessToken:this.signJWT({
                payload,
                secret:process.env.JWT_SECRET,
                expires:'1h'
            }),
            user
        }
    }
}
