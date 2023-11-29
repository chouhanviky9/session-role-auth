import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BcryptService } from '../../common/services/bcrypt.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { JWTService } from 'src/common/services/jwt.service';

@Module({
  imports:[UserModule],
  controllers: [AuthController],
  providers: [AuthService,BcryptService,JWTService]
})
export class AuthModule {}
