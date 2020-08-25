export function either<T, K>(condition: () => T, left: (item: T) => K, right: (item: T) => K): K {
    const result = condition();

    return !!result ? left(result) : right(result);
}
