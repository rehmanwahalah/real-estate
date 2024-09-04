import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { propertyProviders } from '../property/property.provider';
import { usersProviders } from '../user/user.provider';

@Module({
  providers: [...databaseProviders, ...propertyProviders, ...usersProviders],
  exports: [...databaseProviders, ...propertyProviders, ...usersProviders],
})
export class DatabaseModule {}
