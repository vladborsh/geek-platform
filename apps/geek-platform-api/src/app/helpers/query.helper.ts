import { Identifiable } from '@geek-platform/api-interfaces';
import { reduce } from 'lodash';

export function query<T extends Identifiable>(queryObj: Partial<T>): Partial<T> {
  return reduce(queryObj, (acc, value, key) => value === undefined ? acc : { ...acc, [key]: value }, {});
}
