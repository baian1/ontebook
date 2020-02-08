function fail(message?: string): never {
  throw new Error(message);
}

function f3(x: string | undefined) {
  if (x === undefined) fail("undefined argument");
  x.length; // Type narrowed to string
}

function f4(x: number): number {
  if (x >= 0) return x;
  fail("negative number");
}

function f5(x: number): number {
  if (x >= 0) return x;
  fail("negative number");
  x; // Unreachable code error
}
