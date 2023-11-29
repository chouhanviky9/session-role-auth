import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
//ToDo: verify phone and email addresses then activate account

export enum UserRole {
  Admin = 'admin',
  User='user',
  Public = 'public',
}

@Schema()
export class User {
  @Prop({ type: String })
  id: string;
  
  @Prop()
  name: string;

  @Prop({unique:true})
  phone: string;

  @Prop({unique:true})
  email: string;

  @Prop()
  password: string;

  @Prop({default:UserRole.User})
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);