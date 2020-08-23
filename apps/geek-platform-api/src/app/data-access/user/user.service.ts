import { Model, Document } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto, Update, Create } from '@geek-platform/api-interfaces';
import { USER_SCHEMA_NAME } from './user.schema';
import { query } from '../../helpers/query.helper';
import { Observable, from } from 'rxjs';

// tslint:disable: await-promise

export type UserData = Document & Exclude<UserDto, '_id'>;

@Injectable()
export class UserService {
  constructor(@InjectModel(USER_SCHEMA_NAME) private readonly userModel: Model<UserData>) {}

  public create$(userDto: Create<UserDto>): Observable<UserDto> {
    return from(
      new this.userModel({
        ...userDto,
        createdDate: Date.now(),
      }).save(),
    );
  }

  public find$(): Observable<UserDto[]> {
    return from(this.userModel.find());
  }

  public findById$(id: string): Observable<UserDto> {
    return from(this.userModel.findOne(query<UserDto>({ _id: id })));
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
