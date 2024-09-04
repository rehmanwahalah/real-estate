
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info) {
        // console.log( user, err, info )
        // You can throw an exception based on either "info" or "err" arguments
        // console.log(user, info, '##################JWT');
        if (err || !user) {
          // console.log('ERROR', err);
          throw err || new UnauthorizedException();
        }
        return user;
      }
}
