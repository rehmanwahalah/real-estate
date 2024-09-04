import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { USER_REPOSITORY } from 'src/constants';
import { IUserDocument } from './user.schema';
import { sharedCrudService } from '../shared/sharedCrud.services';

interface UserDocument extends IUserDocument {
  _id: Types.ObjectId;
}

@Injectable()
export class UserService extends sharedCrudService {
  constructor(
    @Inject(USER_REPOSITORY) readonly userRepository: Model<IUserDocument>,
  ) {
    super(userRepository);
  }

  async getUserData(reqUser: any) {
    const user = await this.userRepository.findById({
      _id: reqUser._id,
    });
    return user;
  }
}
