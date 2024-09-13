import * as mongoose from 'mongoose';
import { env } from 'process';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://rehmanwahlah248:l73aCc2uUPWuiaod@cluster0.16fl8yq.mongodb.net/property-listing?retryWrites=true&w=majority',
      ),
  },
];