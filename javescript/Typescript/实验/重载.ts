//重载函数声明
function reverse(x: number): number;
function reverse(x: string): string;

//重载函数的实现
//其类型需要满足前面的声明的函数的类型
//方便函数内对元素进行区分 实现重载操作
function reverse(x: number | string): number | string {
  if (typeof x === "number") {
    return Number(
      x
        .toString()
        .split("")
        .reverse()
        .join("")
    );
  } else if (typeof x === "string") {
    return x
      .split("")
      .reverse()
      .join("");
  }
}
let cc = 1n;
const a = reverse(cc);
