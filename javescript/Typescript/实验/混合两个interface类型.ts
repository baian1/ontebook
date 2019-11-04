interface A {
  a: string;
  b: string;
  c: string;
}

interface B {
  a: number;
  b: number;
}

type getAllKey<T, U> = keyof T | keyof U;

type MixinsValue<T, U> = {
  [P in getAllKey<T, U>]: P extends keyof T
    ? P extends keyof U
      ? T[P] | U[P]
      : T[P]
    : P extends keyof U
    ? U[P]
    : never;
};

type C = MixinsValue<A, B>;
