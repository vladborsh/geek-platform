import { Identifiable } from '../base/identifiable.dto';

export type Update<T extends Identifiable> = Pick<T, '_id'> & Partial<Exclude<T, '_id'>>;
