interface A {
  a: number;
  b: string;
}

interface B {
  b: () => {};
}

type change<
  A extends { [index: string]: any },
  B extends { [index: string]: any }
> = {
  [P in keyof A]: P extends keyof B ? B[P] : A[P];
};

type C = change<A, B>;
