type fc = () => void;

interface P {
  test: fc;
}

interface B extends P {
  name: string;
}

let a: fc = () => {};

let b: B = {
  test: a,
};

//(T | U) extends number这种类型会拆开
//T extends number和U extends number
//都满足才会是number
type test<T, U> = T | U extends number ? number : string;
let res: test<number, object> = "string";
type test3<T> = T extends number ? number : string;
let res3: test3<number | object> = "string;";
//&会将两个类型合在一起,只要其中一个满足了number,就可以
type test2<T, U> = T & U extends number ? number : string;
let res2: test2<number, object> = 2;

export {};

type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends undefined
  ? "undefined"
  : T extends Function
  ? "function"
  : "object";

//Conditional Types
type T0 = TypeName<string>;
//   ^ = type T0 = "string"
type T1 = TypeName<"a">;
//   ^ = type T1 = "string"
type T2 = TypeName<true>;
//   ^ = type T2 = "boolean"
type T3 = TypeName<() => void>;
//   ^ = type T3 = "function"
type T4 = TypeName<string[]>;
//   ^ = type T4 = "object"

//Distributive conditional types
type T5 = TypeName<string | (() => void)>;
//   ^ = type T5 = "string" | "function"
type T6 = TypeName<string | string[] | undefined>;
//   ^ = type T6 = "string" | "undefined" | "object"
type T7 = TypeName<string[] | number[]>;
//   ^ = type T7 = "object"

namespace Distributive2 {
  // The distributive property of conditional types can conveniently be used to filter union types
  // Remove types from T that are assignable to U
  type Diff<T, U> = T extends U ? never : T;
  // Remove types from T that are not assignable to U
  type Filter<T, U> = T extends U ? T : never;

  type T1 = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;
  //   ^ = type T1 = "b" | "d"
  type T2 = Filter<"a" | "b" | "c" | "d", "a" | "c" | "f">; // "a" | "c"
  //   ^ = type T2 = "a" | "c"
  type T3 = Diff<string | number | (() => void), Function>; // string | number
  //   ^ = type T3 = string | number
  type T4 = Filter<string | number | (() => void), Function>; // () => void
  //   ^ = type T4 = () => void

  // Remove null and undefined from T
  type NotNullable<T> = Diff<T, null | undefined>;

  type T5 = NotNullable<string | number | undefined>;
  //   ^ = type T5 = string | number
  type T6 = NotNullable<string | string[] | null | undefined>;
  //   ^ = type T6 = string | string[]

  function f1<T>(x: T, y: NotNullable<T>) {
    x = y;
    y = x;
  }

  function f2<T extends string | undefined>(x: T, y: NotNullable<T>) {
    x = y;
    y = x;
    let s1: string = x;
    let s2: string = y;
  }
}

namespace Distributive3 {
  //Conditional types are particularly useful when combined with mapped types
  type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
  }[keyof T];
  type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

  type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
  }[keyof T];
  type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

  interface Part {
    id: number;
    name: string;
    subparts: Part[];
    updatePart(newName: string): void;
  }

  type T1 = FunctionPropertyNames<Part>;
  //   ^ = type T1 = "updatePart"
  type T2 = NonFunctionPropertyNames<Part>;
  //   ^ = type T2 = "id" | "name" | "subparts"
  type T3 = FunctionProperties<Part>;
  //   ^ = type T3 = {
  //       updatePart: (newName: string) => void;
  //   }
  type T4 = NonFunctionProperties<Part>;
  //   ^ = type T4 = {
  //       id: number;
  //       name: string;
  //       subparts: Part[];
  //   }
}

namespace Distributive4 {
  type BoxedValue<T> = { value: T };
  type BoxedArray<T> = { array: T[] };
  type Boxed<T> = T extends any[] ? BoxedArray<T[number]> : BoxedValue<T>;

  type T1 = Boxed<string>;
  //   ^ = type T1 = {
  //       value: string;
  //   }
  type T2 = Boxed<number[]>;
  //   ^ = type T2 = {
  //       array: number[];
  //   }
  type T3 = Boxed<string | number[]>;
  //   ^ = type T3 = BoxedValue | BoxedArray
}
