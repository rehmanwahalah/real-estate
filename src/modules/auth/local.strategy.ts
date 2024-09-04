import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'identifier' });
  }

  async validate(
    identifier: string,
    password: string,
    isAdmin: boolean = false,
  ): Promise<any> {
    console.log(`IDENTIFIER =>`, identifier);

    const user = await this.authService.validateUser(identifier, password);
    if (!user) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    if ((user && user.deletedAt) || (user && user.isDeleted === true)) {
      throw new HttpException(
        'Your account has been deleted',
        HttpStatus.FORBIDDEN,
      );
    }
    return user;
  }
}
