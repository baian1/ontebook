# proxy

new Proxy(target, handler)

## target

- 原生数组
- 对象
- 函数
- 另一个代理等

## handler

执行操作时，代理如何工作

## 支持的拦截操作

- set
- get
- has
- deleteProperty
- ownKeys
- getOwnPropertyDescriptor
- defineProperty
- preventExtensions
- getPrototypeOf
- isExtensible
- setPrototypeOf
- apply  
  用于拦截函数的调用

```
function sum(a, b) {
  return a + b;
}

const handler = {
  apply: function(target, thisArg, argumentsList) {
    console.log(`Calculate sum: ${argumentsList}`);
    // expected output: "Calculate sum: 1,2"

    return target(argumentsList[0], argumentsList[1]) * 10;
  }
};

var proxy1 = new Proxy(sum, handler);

console.log(sum(1, 2));
// expected output: 3
console.log(proxy1(1, 2));
// expected output: 30
```

- construct  
  拦截 new 操作,必须返回一个非空对象

# Reflect

- Reflect.apply()  
  对一个函数进行调用操作，同时可以传入一个数组作为调用参数。和 Function.prototype.apply() 功能类似。
- Reflect.construct()  
  对构造函数进行 new 操作，相当于执行 new target(...args)。
- Reflect.defineProperty()  
  和 Object.defineProperty() 类似。
- Reflect.deleteProperty()  
  作为函数的 delete 操作符，相当于执行 delete target[name]。
- Reflect.get()  
  获取对象身上某个属性的值，类似于 target[name]。
- Reflect.getOwnPropertyDescriptor()  
  类似于 Object.getOwnPropertyDescriptor()。
- Reflect.getPrototypeOf()  
  类似于 Object.getPrototypeOf()。
- Reflect.has()  
  判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同。
- Reflect.isExtensible()  
  类似于 Object.isExtensible().
- Reflect.ownKeys()  
  返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 Object.keys(), 但不会受 enumerable 影响).
- Reflect.preventExtensions()  
  类似于 Object.preventExtensions()。返回一个 Boolean。
- Reflect.set()  
  将值分配给属性的函数。返回一个 Boolean，如果更新成功，则返回 true。
- Reflect.setPrototypeOf()  
  类似于 Object.setPrototypeOf()。
