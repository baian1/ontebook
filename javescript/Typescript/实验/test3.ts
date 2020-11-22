type a = "aaa" | "bbb";
type b = {
  [key in a]: number;
};

declare const customTuple: Tuple<number, 1>;
customTuple[10]; // no error here unfortunately

declare const builtinTuple: [number];
builtinTuple[10]; // error: has no element at index '10'

interface people {
  name?: string;
  age: number;
}

type getReadonlyKey<T, U extends keyof T> = {
  [key in U]-?: T[key];
};

type test = getReadonlyKey<people, "name">;
type test1 = Pick<people, "age">;
type c = Readonly<people>;

/**
 * 通过元组
 * 获取接口中对应字段的属性
 */
type Lookup<T, K> = K extends keyof T ? T[K] : never;

function fn<O, K extends ReadonlyArray<keyof O>>(
  obj: O,
  keys: K
): { [I in keyof K]: Lookup<O, K[I]> } {
  return a as any;
  // return keys.map((key) => obj[key]);
  // return keys;
}

const [id, nickname] = fn(
  { name: 1, a333: "123" } as const,
  ["name", "a333"] as const
);
export {};
