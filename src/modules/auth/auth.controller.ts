import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from './local-auth.guard';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import * as jwt from 'jsonwebtoken';
import { FileInterceptor } from '@nestjs/platform-express';
import { Model } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { CommonServices } from '../shared/common.service';
import { jwtConstants } from 'src/constants/jwt.constant';

@Controller('auth')
export class AuthController extends CommonServices {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super();
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Req() req: any,
    @Res() res: Response,
    @Body() body: any,
  ): Promise<any> {
    try {
      const Userresp: any = await this.authService.login(req.user, body);
      return this.sendResponse(
        this.messages.Success,
        Userresp,
        HttpStatus.OK,
        res,
      );
    } catch (error) {
      console.log(`error =>`, error);
      return this.sendResponse(
        'Internal server Error',
        {},
        HttpStatus.INTERNAL_SERVER_ERROR,
        res,
      );
    }
  }

  @Post('/signup')
  async signup(
    @Req() req: any,
    @Res() res: Response,
    @Body() body: any,
  ): Promise<any> {
    try {
      const email = body.email.toLowerCase().trim();

      const checkUser = await this.userService.sharedFindOne({ email: email });

      if (checkUser && checkUser.email == email) {
        return this.sendResponse(
          this.messages.userAlreadyExist,
          {},
          HttpStatus.CONFLICT,
          res,
        );
      }

      const createUser = await this.userService.sharedCreate({
        ...body,
        password: bcrypt.hashSync(body.password, jwtConstants.salt),
        roles: ['user'],
      });

      const Userresp: any = await this.authService.login(createUser);

      return this.sendResponse(
        'Account created!',
        {
          ...Userresp,
        },
        HttpStatus.OK,
        res,
      );
    } catch (error) {
      console.log(error);

      return this.sendResponse(
        'Internal server Error',
        {},
        HttpStatus.INTERNAL_SERVER_ERROR,
        res,
      );
    }
  }
}
