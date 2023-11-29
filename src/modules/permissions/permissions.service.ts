import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission, PermissionDocument, PermissionSchema } from './permission.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PermissionsService {
  constructor(@InjectModel('permission') private readonly permissionModel: Model<PermissionDocument>) {}
  async create(createPermissionDto: CreatePermissionDto):Promise<Permission> {
    let existing=await this.permissionModel.findOne({...createPermissionDto});
    if(existing){
      throw new ConflictException("Permission already exists");
    }
    return this.permissionModel.create(createPermissionDto);
  }

  findAll() {
    return `This action returns all permissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }

  async isRoleAllowedForPath(path: string, userRole: string,method:string): Promise<boolean> {
    const permission = await this.permissionModel.findOne({path,method});
    if (!permission) {
      return false;
    }
    return  permission.allowedRoles.includes(userRole);
  }

}
