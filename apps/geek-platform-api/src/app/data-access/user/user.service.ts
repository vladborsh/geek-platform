import { Model, Document, DocumentQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto, Update } from '@geek-platform/api-interfaces';
import { USER_SCHEMA_NAME } from './user.schema';
import { query } from '../../helpers/query.helper';
import { Observable, from } from 'rxjs';
import { compose } from 'lodash/fp';

// tslint:disable: await-promise

export type UserData = Document & Exclude<UserDto, '_id'>;

type UserQuery = DocumentQuery<UserData[], UserData>;

@Injectable()
export class UserService {
  constructor(@InjectModel(USER_SCHEMA_NAME) private readonly userModel: Model<UserData>) {}

  public create$(userDto: Omit<UserDto, '_id'>, teacherId: string): Observable<UserDto> {
    return from(
      new this.userModel({
        ...userDto,
        teacherId,
        createdDate: Date.now(),
      }).save(),
    );
  }

  public find$(
    limit?: number,
    page?: number,
    sortField?: string,
    order?: string,
  ): Observable<UserDto[]> {
    const queryFactory = compose(
      getLimitFilter(limit),
      getSkipFilter(page, limit),
      getSorting(sortField, order),
    );

    return from(queryFactory(this.userModel.find()));
  }

  public findById$(id: string): Observable<UserDto[]> {
    return from(this.userModel.find(query<UserDto>({ _id: id })));
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    return await this.userModel.findOne(query<UserDto>({ email }));
  }

  async updateOne(user: Update<UserDto>): Promise<UserDto> {
    return await this.userModel.findByIdAndUpdate(user._id, user);
  }

  async deleteOne(id: string): Promise<UserDto> {
    return await this.userModel.findByIdAndRemove(id);
  }
}

function getSkipFilter(page?: number, limit?: number): (source: UserQuery) => UserQuery {
  return (source: UserQuery) => (page && limit ? source.skip(page * limit) : source);
}

function getLimitFilter(limit?: number): (source: UserQuery) => UserQuery {
  return (source: UserQuery) => (limit ? source.limit(limit) : source);
}

function getSorting(filed: string, order?: string): (source: UserQuery) => UserQuery {
  return (source: UserQuery) => (order ? source.sort({ filed, test: order }) : source);
}
