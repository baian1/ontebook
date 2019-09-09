function test<T, K extends keyof T>(obj: T, arr: K[]) {
  arr.forEach(item => {
    console.log(obj[item]);
  });
}

let a = {
  name: "122",
  age: 5
};

test(a, ["name", "age"]);
