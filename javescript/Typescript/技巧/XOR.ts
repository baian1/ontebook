//object类型的检测只会检测存在的key,对于多余key不会进行检测
namespace XOR {
  interface A {
    foo: string;
  }
  interface B {
    bar: string;
  }

  type C = A | B;

  const a: C = { foo: "" }; // Wrongfully ✔ // Hopefully #12745 fixes this
  const b: C = { bar: "" }; // Wrongfully ✔ // Hopefully #12745 fixes this
  //联合类型,只要满足其中的某一项就可以了
  const c: C = { foo: "", bar: "" }; // ✔

  //使用undefinde来对不要的类型的类型进行排斥
  //type D = { m: number } ^ { n: number } ^ { o: number }
  // ->
  type D =
    | { m: number; n: undefined; o: undefined }
    | { m: undefined; n: number; o: undefined }
    | { m: undefined; n: undefined; o: number };
  const d: D = {
    m: undefined, //undefined为类型值,所以必须存在m,n
    n: undefined,
    o: 5
  };

  //使用?来改进,undefined会使值等于undefined时也能通过检测
  type E =
    | { m: number; n?: undefined; o?: undefined }
    | { m: undefined; n?: number; o: undefined }
    | { m: undefined; n: undefined; o?: number };
  const e: E = {
    m: 3,
    n: undefined
  };

  //使用never代替undefined
  //达到值必须不存在的目的
  type F =
    | { m: number; n?: never; o?: never }
    | { m: never; n?: number; o: never }
    | { m: never; n: never; o?: number };
  const f: F = {
    m: 3
  };

  //Without用来设置不需要的key为key?:never
  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
  type XOR<T, U> = (T | U) extends object
    ? //Without<T, U> & U,T中有U中没有的属性设为key?:never 交叉 U 完成一个类型定义
      (Without<T, U> & U) | (Without<U, T> & T)
    : T | U;
}
