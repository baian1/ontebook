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

export {};
