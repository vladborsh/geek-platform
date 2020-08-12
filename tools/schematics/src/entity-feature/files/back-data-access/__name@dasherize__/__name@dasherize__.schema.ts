import { Schema } from 'mongoose';
import { schema } from '../../helpers/schema.helper';
import { <%= classify(name) %>Dto } from '@geek-platform/api-interfaces';

export const <%= camelize(name) %>Schema = new Schema(
  schema<<%= classify(name) %>Dto>({
  }),
);

export const <%= uppercase(underscore(name)) %>_SCHEMA_NAME = '<%= camelize(name) %>';
