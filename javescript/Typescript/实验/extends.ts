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
