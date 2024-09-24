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

    const [listings, tLisitngsCount] = await Promise.all([
      this.propertyRepository
        .find({ $and: [...query] })
        .sort({ createdAt: -1 })
        .skip(resPerPage * (page - 1))
        .limit(resPerPage)
        .exec(),
      this.propertyRepository.countDocuments({ $and: [...query] }).exec(),
    ]);

    return {
      listings,
      current_page: page,
      pages: Math.ceil(tLisitngsCount / resPerPage),
      total_listings: tLisitngsCount,
      per_page: resPerPage,
    };
  }

  /**
   * It will recieve array of IDs to get the recommended listing
   * @param page
   * @param resPerPage
   * @param search
   * @returns
   */
  async propertyLisitngRecommendedSearch(
    page: number,
    resPerPage: number,
    recommendations: string[],
  ): Promise<any> {
    const query = [];

    // Check if recommendations is a string and split it into an array
    if (typeof recommendations === 'string') {
      //@ts-ignore
      recommendations = recommendations.split(',');
    }

    query.push({ id: { $exists: true } });

    // Modify the query to handle an array of IDs
    if (recommendations && recommendations.length > 0) {
      query.push({ id: { $in: recommendations } });
    }

    const [listings, tLisitngsCount] = await Promise.all([
      this.propertyRepository
        .find({ $and: [...query] })
        .sort({ createdAt: -1 })
        .skip(resPerPage * (page - 1))
        .limit(resPerPage)
        .exec(),
      this.propertyRepository.countDocuments({ $and: [...query] }).exec(),
    ]);

    return {
      listings,
      current_page: page,
      pages: Math.ceil(tLisitngsCount / resPerPage),
      total_listings: tLisitngsCount,
      per_page: resPerPage,
    };
  }
}
