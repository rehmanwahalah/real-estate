import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Model } from 'mongoose';
import { CommonServices } from '../shared/common.service';
var qs = require('qs');

@Injectable()
export class AuthService extends CommonServices {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {
    super();
  }

  async login(user: any, body: any = {}) {
    const payload = {
      userId: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: 'secretKey',
        expiresIn: '60d',
      }),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  async validateUser(identifier: string, password: string): Promise<any> {
    console.log(`IDENTIFIER =>`, identifier);
    console.log(`password =>`, password);
    const user = await this.userService.userRepository
      .findOne({
        $or: [{ email: identifier }, { username: identifier }],
      })
      .select('+password');
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    } else {
      const userInLowerCase = await this.userService.userRepository
        .findOne({
          $or: [
            { email: identifier.toLowerCase() },
            { username: identifier.toLowerCase() },
          ],
        })
        .select('+password');
      if (
        userInLowerCase &&
        bcrypt.compareSync(password, userInLowerCase.password)
      ) {
        return userInLowerCase;
      }
    }
    return null;
  }

  async validateByEmail(identifier: string): Promise<any> {
    const user = await this.userService.userRepository.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (user) {
      const rUser = {
        userId: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        roles: user.roles,
        // iat: user.iat,
        // exp: user.exp
      };
      return rUser;
    } else {
      const userInLowerCase = await this.userService.userRepository.findOne({
        $or: [
          { email: identifier.toLowerCase() },
          { username: identifier.toLowerCase() },
        ],
      });
      if (userInLowerCase) {
        const rUser = {
          userId: userInLowerCase._id,
          name: userInLowerCase.name,
          username: user.username,
          email: userInLowerCase.email,
          roles: userInLowerCase.roles,
        };
        return rUser;
      }
    }
    return null;
  }
}
