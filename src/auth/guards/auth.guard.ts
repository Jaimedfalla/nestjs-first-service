import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from 'src/constants/key-decorator';
import {Request} from 'express';
import { UsersService } from 'src/users/services/users.service';
import { useToken } from 'src/utils/helpers/functions';
import { IUseToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly userService:UsersService,
    private readonly reflector:Reflector  //Permite leer los decoradores
  ){}
  
  async canActivate(
    context: ExecutionContext,
  ) {
    const isPublic:boolean = this.reflector.get<boolean>(PUBLIC_KEY,context.getHandler());

    if(isPublic) return isPublic;

    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers['access_token'];

    if(!token || Array.isArray(token)) throw new UnauthorizedException('Invalid token!');

    const manageToken:IUseToken | string = useToken(token);

    if(typeof manageToken === 'string') throw new UnauthorizedException(manageToken);
    if(manageToken.isExpired) throw new UnauthorizedException('Token expired');

    const {sub}=manageToken;
    const user = await this.userService.findUserById(sub);

    if(!user) throw new UnauthorizedException('Invalid User!');

    req.idUser = user.id;
    req.roleUser = user.role;

    return true;
  }
}
