import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PermissionsService } from 'src/modules/permissions/permissions.service';
import { UserService } from 'src/modules/user/user.service';
import { redisClient } from '../middlewares/session.middleware';
import * as cookie from 'cookie';
const expiredCookie = cookie.serialize('connect.sid', '', {
  maxAge: 0,  // Set maxAge to 0 to make the cookie expire immediately
  expires: new Date("2022-11-29T20:30:07.111Z"),  // Alternatively, you can set expires to a past date
  path: '/',  // Set the path to match the original cookie path
  httpOnly: true,  // Make sure to set httpOnly if it was set for the original cookie
});
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,private readonly permissionService: PermissionsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    if(!!request.session.user){
      const sessionId=await redisClient.get(request.session.user.id);
      const isSessionValid=await redisClient.get(`sess:${sessionId}`);
      if(!isSessionValid){
        request.session=null;
        response.setHeader('Set-Cookie', expiredCookie);
        throw new UnauthorizedException("try login again");
      }
    }
    const userRole =request?.session?.user?.role || 'public'; 
    const isAuthorized=await this.permissionService.isRoleAllowedForPath(request.path, userRole,request.method);
    if(!isAuthorized)throw new ForbiddenException("You dont have enough permission.");
    return true;
  }
}
