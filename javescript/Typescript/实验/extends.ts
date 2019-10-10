namespace ext {
  type fc = () => void;

  interface P {
    test: fc;
  }

  interface B extends P {
    name: string;
  }

  let a: fc = () => {};

  let b: B = {
    test: a
  };

  //(T | U) extends number这种类型会拆开
  //T extends number和U extends number
  //都满足才会是number
  type test<T, U> = (T | U) extends number ? number : string;
  let res: test<number, object> = "string";
  //&会将两个类型合在一起,只要其中一个满足了number,就可以
  type test2<T, U> = (T & U) extends number ? number : string;
  let res2: test2<number, object> = 2;
}
