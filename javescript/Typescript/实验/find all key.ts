interface Test {
  key: number;
  aaa: {
    na: string;
    p: string;
  };
}

type a = Test["aaa"]
