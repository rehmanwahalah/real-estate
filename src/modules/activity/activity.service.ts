import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { sharedCrudService } from '../shared/sharedCrud.services';
import { ACTIVITY_REPOSITORY } from 'src/constants';
import { IUserActivityDocument } from './activity.schema';

@Injectable()
export class ActivityService extends sharedCrudService {
  constructor(
    @Inject(ACTIVITY_REPOSITORY)
    readonly activityRepository: Model<IUserActivityDocument>,
  ) {
    super(activityRepository);
  }

  async activityLisitng(
    page: number,
    resPerPage: number,
    search: string,
  ): Promise<any> {
    return 'Hello from Activity service.'
  }
}
