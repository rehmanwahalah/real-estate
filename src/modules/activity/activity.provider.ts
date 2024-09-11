import { Connection } from 'mongoose';
import { ACTIVITY, ACTIVITY_REPOSITORY } from 'src/constants';
import { UserActivitySchema } from './activity.schema';

export const activityProviders = [
  {
    provide: ACTIVITY_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.model(ACTIVITY, UserActivitySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
