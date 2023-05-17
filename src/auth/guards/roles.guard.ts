import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/constants/key-decorator';
import { ROLES } from 'src/constants/roles';
import {Request} from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  
  private message = 'No tienes permisos para esta operación';

  constructor(private readonly reflector:Reflector  //Permite leer los decoradores
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic:boolean = this.reflector.get<boolean>(PUBLIC_KEY,context.getHandler());

    if(isPublic) return isPublic;

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(ROLES_KEY,context.getHandler());
    const admin = this.reflector.get<string>(ADMIN_KEY,context.getHandler());  
    const req = context.switchToHttp().getRequest<Request>();
    const {roleUser} = req;

    console.log(roles);

    if (roles === undefined) {
      if (!admin || (admin && roleUser === admin)) return true;
      else throw new ForbiddenException(this.message,);
    }

    if(roleUser === ROLES.ADMIN) return true;

    const isAuth = roles.some((role) => role === roleUser);

    if (!isAuth) throw new ForbiddenException(this.message);

    return true;
  }
}
