function test<T = {}>(a: string, b: T) {
  return b;
}

test("", { a: 4 });

export {};
