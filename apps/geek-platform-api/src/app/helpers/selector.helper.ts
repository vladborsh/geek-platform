import { Identifiable } from '@geek-platform/api-interfaces';

export function selector<T extends Identifiable>(...args: (keyof T)[]): string {
  return args.join(' ');
}
