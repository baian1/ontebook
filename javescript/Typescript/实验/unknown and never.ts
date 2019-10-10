//unknown用于取代any
let a: unknown = 1;

let b: unknown = 5;
a = b;

//是所有类型的父集
type aa = number & unknown;
type aaa = number | unknown;
let uu: unknown;
let uuu: number = uu;
let uuuu: boolean = uu;
let uuuuu: object = uu;

//never是最小类型,只有never可以给never
// Function returning never must have unreachable end point
function error(message: string): never {
  throw new Error(message);
}

// Inferred return type is never
function fail() {
  return error("Something failed");
}

// Function returning never must have unreachable end point
function infiniteLoop(): never {
  while (true) {}
}
//是所有类型的子集
type C = number | never;
type D = unknown & never;
let nn: never;
let nnn: number = nn;
let nnnn: boolean = nn;
let nnnnn: object = nn;
