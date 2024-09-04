import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { sharedCrudService } from '../shared/sharedCrud.services';
import { PROPERTY_REPOSITORY } from 'src/constants';
import { IPropertyDocument } from './property.schema';

@Injectable()
export class PropertyService extends sharedCrudService {
  constructor(
    @Inject(PROPERTY_REPOSITORY)
    readonly propertyRepository: Model<IPropertyDocument>,
  ) {
    super(propertyRepository);
  }

  async propertyLisitng(
    page: number,
    resPerPage: number,
    search: string,
  ): Promise<any> {
    const query = [];
    query.push({ id: { $exists: true } });

    if (search) query.push({ title: { $regex: search, $options: 'i' } });

    const [users, cusersCount] = await Promise.all([
      this.propertyRepository
        .find({ $and: [...query] })
        .sort({ createdAt: -1 })
        .skip(resPerPage * (page - 1))
        .limit(resPerPage)
        .exec(),
      this.propertyRepository.countDocuments({ $and: [...query] }).exec(),
    ]);

    return {
      users,
      current_page: page,
      pages: Math.ceil(cusersCount / resPerPage),
      total_users: cusersCount,
      per_page: resPerPage,
    };
  }
}
