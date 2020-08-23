export function reduce <T, K>(f: (acc: K, curr: T) => K, init: K, arr: T[]): K {
  return Array.prototype.reduce.call(arr, f, init);
}
