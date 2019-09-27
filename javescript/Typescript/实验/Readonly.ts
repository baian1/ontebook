function f1(mt: [number, number], rt: readonly [number, number]) {
  mt[0] = 1; // Ok
  rt[0] = 1; // Error, read-only element
}

function f2(
  ma: string[],
  ra: readonly string[],
  mt: [string, string],
  rt: readonly [string, string]
) {
  ma = ra; // Error
  ma = mt; // Ok
  ma = rt; // Error
  ra = ma; // Ok
  ra = mt; // Ok
  ra = rt; // Ok
  mt = ma; // Error
  mt = ra; // Error
  mt = rt; // Error
  rt = ma; // Error
  rt = ra; // Error
  rt = mt; // Ok
}

type ReadWrite<T> = { -readonly [P in keyof T]: T[P] };

type T0 = Readonly<string[]>; // readonly string[]
type T1 = Readonly<[number, number]>; // readonly [number, number]
type T2 = Partial<Readonly<string[]>>; // readonly (string | undefined)[]
type T3 = Readonly<Partial<string[]>>; // readonly (string | undefined)[]
type T4 = ReadWrite<Required<T3>>; // string[]
