import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { CommonServices } from '../shared/common.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'


@Controller('user')
export class UserController extends CommonServices {
  constructor(
    private readonly userService: UserService,
  ) {
    super();
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  async getUserDetails(@Res() res: Response, @Req() req): Promise<any> {
    try {
      const response = await this.userService.userRepository.findById(
        req.user.userId,
      );

      return this.sendResponse(
        this.messages.Success,
        response ?? 'NOT_FOUND',
        HttpStatus.OK,
        res,
      );
    } catch (error) {
      return this.sendResponse(
        'Internal server Error',
        {},
        HttpStatus.INTERNAL_SERVER_ERROR,
        res,
      );
    }
  }
}
