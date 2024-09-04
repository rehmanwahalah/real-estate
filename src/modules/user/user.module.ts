import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService],
  exports: [UserService, AuthService, JwtService],
})
export class UserModule {}
