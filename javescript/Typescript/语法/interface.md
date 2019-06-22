# 普通类型
```
interface SquareConfig {
  color?: string;
  width?: number;
}
```
## 只读类型
```
interface Point {
  readonly x: number;
  readonly y: number;
}
```
隐式只读:  
- 属性声明只使用get访问器而没有使用set访问器被视为只读的。
- 在枚举类型中，枚举成员被视为只读属性。
- 在模块类型中，导出的const变量被视为只读属性。
- 在import语句中声明的实体被视为只读的。
- 通过ES2015命名空间导入访问的实体被视为只读的（例如，当foo当作import * as foo from "foo"声明时，foo.x是只读的）。

# 函数类型
```
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```
## this类型
this参数是伪参数，它位于函数参数列表的第一位
```
function f(this: void) {
  // 确保`this`在这个独立的函数中无法使用
}
```
# 数组类型
本质上就是描述一个对象该是什么样子
```
interface StringArray {
  [index: number]: string;
}
var myArray: StringArray;
myArray = ["Bob", "Fred"];
```

# 类类型
强制让类符合某个类型
## 静态部分检测
```
interface SearchConstructor {
  new(source: string, subString: string): Search;
  a: number;
}

let a: SearchConstructor = Search1;
```
## 实例部分
检测class的实例部分
```
interface Search {
  source: string;
  subString: string;
}

class Search1 implements Search{}
```

## 抽象类
一个抽象类允许没有被实现的方法, 并且不能被构造.
```
abstract class Base {
  abstract getThing(): string;
  getOtherThing() { return 'hello'; }
}
```
继承抽象类有两种方式
1. 用抽象类来继承
2. 用类来继承,需要实现抽象类的方法

### 抽象属性和访问器
```
abstract class Base {
  abstract name: string;
  abstract get value();
  abstract set value(v: number);
}

class Derived extends Base {
  name = "derived";

  value = 1;
}
```

## 将基类构造函数的返回值作为'this'
在ES2015中，构造函数的返回值（它是一个对象）隐式地将this的值替换为super()的任何调用者。
```
class Base {
  x: number;
  constructor() {
    // 返回一个除“this”之外的新对象
    return {
      x: 1,
    };
  }
}

class Derived extends Base {
  constructor() {
    super();
    this.x = 2;
  }
}
```
