import { IsNotEmpty } from "class-validator";

export class CreateAuthDto {}

export class RegisterDto{
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;
}
