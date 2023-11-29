import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {  RegisterDto } from './dto/create-auth.dto';
import { BcryptService } from '../../common/services/bcrypt.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { LoginDto } from './dto/common.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly userService: UserService,
  ) {}

  async register(registerAuthDto: RegisterDto): Promise<Partial<User>> {
    let userExist = await this.userService.findIfExist({
      phone: registerAuthDto.phone,
      email: registerAuthDto.email,
    });
    if (userExist) {
      throw new BadRequestException(
        'User with the provided phone or email already exists',
      );
    }
    registerAuthDto.password = await this.bcryptService.hashPassword(
      registerAuthDto.password,
    );
    let registeredUser=await this.userService.create(registerAuthDto);
    const { password : ps, ...userWithoutPassword } = registeredUser;
    return userWithoutPassword;
  }

  async login({ phone=null, email=null, password }: Partial<LoginDto>): Promise<Partial<User>> {
    if (!phone || !email) {
      throw new BadRequestException('Phone or email is required');
    }
    const userExist = phone
      ? await this.userService.findIfExist({ phone })
      : await this.userService.findIfExist({ email });

    if (!userExist) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await this.bcryptService.comparePasswords(
      password,
      userExist.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Password');
    }
    const { name,email:mail,phone:tel,role} = userExist;
    return { id:userExist._id.toString(),name,email:mail,phone:tel,role};
  }

  async profile(userId:string): Promise<Partial<User>> {
    const userExist = await this.userService.findOne(userId);
    const { _id,name,email:mail,phone:tel,role} = userExist;
    return { id:userExist._id.toString(),name,email:mail,phone:tel,role};
  }
}

