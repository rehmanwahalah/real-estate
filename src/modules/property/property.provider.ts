import { Connection } from 'mongoose';
import { PROPERTIE, PROPERTY_REPOSITORY } from 'src/constants';
import { PropertySchema } from './property.schema';

export const propertyProviders = [
  {
    provide: PROPERTY_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.model(PROPERTIE, PropertySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
