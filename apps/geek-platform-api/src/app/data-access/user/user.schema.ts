import { Schema } from 'mongoose';
import { schema } from '../../helpers/schema.helper';
import { UserDto } from '@geek-platform/api-interfaces';

export const USER_SCHEMA = new Schema(schema<UserDto>({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  teacherId: String,
  createdDate: Number,
  photoImgUrl: String,
}));

export const USER_SCHEMA_NAME = 'user';
