function getProperty<T extends object>(obj: T, key: keyof T) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "m");
