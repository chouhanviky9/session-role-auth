import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permission, PermissionSchema } from './permission.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'permission', schema: PermissionSchema }])
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService,Permission],
  exports:[PermissionsService]
})
export class PermissionsModule {}
