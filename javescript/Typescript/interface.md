# Excess Property Checks

```Typescript
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}

//直接输入对象的情况会对colour进行检测,判断不存在于SquareConfig报错
let mySquare = createSquare({ colour: "red", width: 100 });

//跳过
let squareOptions = { colour: "red" };
let mySquare = createSquare(squareOptions);
```

# Function Types

对于函数类型,如果我们没有指定,那就会继承接口的类型

```Typescript
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;

//我们给函数参数类型
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}

//假如没有指定参数类型,那他将从SearchFunc进行推导
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}
```

# Indexable Types

有两种索引类型,number 和 string  
由于在 js 中 number 将会被转换为 string 使用  
其类型必须是 string 的子类型

```Typescript
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

//Dog为Animal的子类型
interface NotOkay {
    [x: number]: Dog;
    [x: string]: Animal;
}
```
