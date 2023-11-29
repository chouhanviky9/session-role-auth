import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/modules/user/user.model';

@Injectable()
export class JWTService {
  private readonly secret: string;

  constructor() {
    this.secret = process.env.JWT_KEY;
  }

  decodeToken(token: string) {
    const secret = process.env.JWT_KEY;
    return jwt.verify(token, secret);
  }

  generateToken(user: User): string {
    const payload = { sub: user.id, name: user.name, roles: user.role };
    const options = { expiresIn: '12h' }; // Set the expiration time as needed
    return jwt.sign(payload, process.env.JWT_KEY, options);
  }
}
