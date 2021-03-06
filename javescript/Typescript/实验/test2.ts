function isNumber(x: any): x is boolean {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}

function padLeft(value: string, padding: string | number) {
  if (isNumber(padding)) {
    return Array(padding + 1).join(" ") + value;
  }
  if (isString(padding)) {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

function broken(name: null | string): string {
  function postfix(epithet: string) {
    return name.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
  }
  name = name || "Bob";
  return postfix("great");
}

broken(null);

let t: [number, string?, boolean?];
t = [42, "hello", true];
t = [42, "hello"];
t = [42];

type T30<T> = unknown extends T ? true : false;  // Deferred
type T31<T> = T extends unknown ? true : false;  // Deferred (so it distributes)
type T32<T> = never extends T ? true : false;  // true
type T33<T> = T extends never ? true : false;  // Deferred


type tttt = [number, number]

type aaa = {
  [P in keyof tttt]: P extends number ? Promise<tttt[P]> : P;
}

type a=getKey<tttt>

type getKey<T> = {
  [P in keyof T]: P extends string ? Promise<T[P]> : P;
}

type MapToPromise<T> = { [K in keyof T]: Promise<T[K]> };

type Coordinate = [number, number]

type PromiseCoordinate = MapToPromise<Coordinate>; // [Promise<number>, Promise<number>]

let a: a = [Promise.resolve(1), Promise.resolve(1)];

function readImage(path: string, callback: (err: any, image: Image) => void) {
  // ...
}

readImage.sync = (path: string) => {
  const contents = fs.readFileSync(path);
  return decodeImageSync(contents);
}

function spread<T, U>(t: T, u: U) {
  return { ...t, ...u };  // T & U
}
type big=bigint
let bignumber:big=100n;
declare let x: { a: string, b: number };
declare let y: { b: string, c: boolean };
let s2 = spread(x, y);