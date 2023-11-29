import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UnauthorizedException, Session, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto,  RegisterDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto, LoginErrorResponse, LoginSuccessResponse } from './dto/common.dto';
import { Request } from 'express';
import { User } from '../user/user.model';
import { redisClient } from 'src/common/middlewares/session.middleware';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() createAuthDto: RegisterDto) {
    return this.authService.register(createAuthDto);
  }
  @Post('/login')
  async login(@Body() loginDto:Partial<LoginDto>,@Req() req): Promise<LoginSuccessResponse | LoginErrorResponse>{
    let user=await this.authService.login({...loginDto});
    if(!user) throw new UnauthorizedException("Login failed");
    let ifSessionExist=await redisClient.get(user.id);
    if(ifSessionExist){
      redisClient.del(`sess:${ifSessionExist}`);
    }
    console.log(user.id,ifSessionExist)
    redisClient.SET( user.id, req.sessionID)
    req.session.user = {id:user.id,role: user.role};
    return {message: "Login Successfully",status:200};
  }
  @Get('/profile')
  async profile(@Req() req):Promise<Partial<User>>{
    const userId = req?.session?.user?.id;
    if(!userId)throw new UnauthorizedException("login for accessing info.")
    return this.authService.profile(userId);
  }
}
