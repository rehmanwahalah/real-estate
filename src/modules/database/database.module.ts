import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { propertyProviders } from '../property/property.provider';
import { usersProviders } from '../user/user.provider';
import { activityProviders } from '../activity/activity.provider';

@Module({
  providers: [
    ...databaseProviders,
    ...propertyProviders,
    ...usersProviders,
    ...activityProviders,
  ],
  exports: [
    ...databaseProviders,
    ...propertyProviders,
    ...usersProviders,
    ...activityProviders,
  ],
})
export class DatabaseModule {}
