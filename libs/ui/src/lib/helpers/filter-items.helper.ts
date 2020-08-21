export function filterItems<T extends {}>(items: T[], filter: string, fields: string[]): T[] {
  if (!filter) {
    return items;
  }

  return items.filter(item =>
    Object.keys(item)
      .filter(key => fields.includes(key))
      .some(key =>
        String(item[key]).toLocaleLowerCase()
          .includes(filter.toLowerCase()),
      ),
  );
}
