declare function assert(value: unknown): asserts value;
declare function assertIsArrayOfStrings(obj: unknown): asserts obj is string[];
declare function assertNonNull<T>(obj: T): asserts obj is NonNullable<T>;

function assertIsNumber(a: unknown): asserts a is number {
  if (typeof a !== "number") {
    throw new Error("param is not number");
  }
}
function isNumber(a: unknown): a is number {
  if (typeof a !== "number") {
    return false;
  } else {
    return true;
  }
}

function main(a: string | number) {
  assert(isNumber(a));
  a;
}

function f1(x: unknown) {
  assert(typeof x === "string");
  return x.length; // x has type string here
}

function f2(x: unknown) {
  assertIsArrayOfStrings(x);
  return x[0].length; // x has type string[] here
}

function f3(x: string | undefined) {
  assertNonNull(x);
  return x.length; // x has type string here
}
