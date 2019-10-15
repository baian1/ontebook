interface Test {
  name: string;
  age: number;
}
type ReadOnlyTest = Readonly<Test>;

let a: ReadOnlyTest = {
  name: "444",
  age: 5
};

let b: Test = a;

let aa: readonly number[] = [111];
let bb: number[] = aa;
