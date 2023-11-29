import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [UserService,User],
  exports:[UserService]
})
export class UserModule {}
