//关于infer的推断规则 https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types
export type Intersection<TUnion> = (TUnion extends any
? (_: TUnion) => void
: never) extends (_: infer T) => void
  ? T
  : never;

interface A {
  a: {
    name: string;
    age: number;
  };
  b: never;
}

type B = Intersection<A[keyof A]>;
