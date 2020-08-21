import { Identifiable } from '../base/identifiable.dto';

export type Create<T extends Identifiable> = Pick<T, Exclude<keyof T, '_id' | 'createdDate'>>;
