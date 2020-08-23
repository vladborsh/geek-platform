export function filterItems<T extends {}>(items: T[], filter: string, filterFiledFunc: (item: T) => string): T[] {
  if (!filter) {
    return items;
  }

  return items.filter(item =>
    filterFiledFunc(item)
      .toLocaleLowerCase()
      .includes(filter.toLowerCase()),
  );
}
