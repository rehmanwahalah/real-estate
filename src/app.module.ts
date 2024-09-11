import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './modules/property/property.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ActivityModule } from './modules/activity/activity.module';

@Module({
  imports: [PropertyModule, AuthModule, UserModule, ActivityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
