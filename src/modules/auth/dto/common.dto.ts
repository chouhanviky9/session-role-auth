export class LoginSuccessResponse {
    accessToken: string;
    status:number;
  }

 export class LoginErrorResponse {
    message: string;
    status:number;
  }
  

export class LoginDto {
  phone?: string;
  email?: string;
  password: string;
}
