import { ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-custom';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt')  {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(req: Request): Promise<any> {
    try {
    const authHeader = String(req.headers['authorization'] || '');
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7, authHeader.length);
      const payload:any = jwtDecode(token) as any;
      const user = this.authService.validateByEmail(payload.email)
      return user ? user : false
    }
    else{
      return false
    }
  } catch (error) {
    return error
  }
   
  }
}