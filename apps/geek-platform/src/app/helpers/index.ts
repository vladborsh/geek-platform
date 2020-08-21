export function reduce <T, K>(f: (acc: K, curr: T) => K, init: T, arr: T[]): K {
  return Array.prototype.reduce.call(arr, f, init);
}
