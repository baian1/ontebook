function compose<A, B, C>(f: (arg: A) => B, g: (arg: B) => C): (arg: A) => C {
  return x => g(f(x));
}

interface Person {
  name: string;
  age: number;
}

function getDisplayName(p: Person) {
  return p.name.toLowerCase();
}

function getLength(s: string) {
  return s.length;
}

// has type '(p: Person) => number'
const getDisplayNameLength = compose(
  getDisplayName,
  getLength,
);

// works and returns the type 'number'
getDisplayNameLength({ name: "Person McPersonface", age: 42 });