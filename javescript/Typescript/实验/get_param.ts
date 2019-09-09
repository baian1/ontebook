function test(a: string, b: number): void {}

type getParam<T> = T extends (...arg: infer R) => any ? R : unknown;

type aaaaa = getParam<typeof test>;

type ReturnType11<T> = T extends (...args: any[]) => infer R ? R : any;
