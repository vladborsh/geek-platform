export function LocalStorage(): (target: Object, propertyName: string) => void {
  function setInLocalStorage(key: string, value: string) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  function getFromLocalStorage(key: string) {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : '';
  }

  return (target: Object, propertyName: string): void => {
    Object.defineProperty(target, propertyName, {
      get: () => getFromLocalStorage(propertyName),
      set: (newValue: string) => setInLocalStorage(propertyName, newValue),
      enumerable: true,
      configurable: true,
    });
  };
}
