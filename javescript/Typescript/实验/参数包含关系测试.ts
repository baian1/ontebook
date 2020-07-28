function A(ren: { age: number; name: string }) {
  return "11";
}

A({ age: 4, name: "sad", ys: "sad" });

function B<T extends any = any>(nums: T) {
  return nums;
}

let ass = B("sad");

export {};
