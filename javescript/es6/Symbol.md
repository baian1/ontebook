# Symbol

- Symbols 绝不会与对象的字符串 key 冲突

- Symbols 无法通过现有的反射工具读取。你需要一个新的方法 Object.getOwnPropertySymbols() 来访问对象上的 Symbols，这让 Symbol 适合存储那些你不想让别人直接获得的信息。使用 Object.getOwnPropertySymbols() 是一个非常特殊的用例，一般人可不知道。

- Symbols 不是私有的。作为双刃剑的另一面 —— 对象上所有的 Symbols 都可以直接通过 Object.getOwnPropertySymbols() 获得 —— 这不利于我们使用 Symbol 存储一些真正需要私有化的值。不要尝试使用 Symbols 存储对象中需要真正私有化的值 —— Symbol 总能被拿到。

- 可枚举的 Symbols 能够被复制到其他对象，复制会通过类似这样的 Object.assign 新方法完成。如果你尝试调用 Object.assign(newObject, objectWithSymbols)，并且所有的可迭代的 Symbols 作为了第二个参数（objectWithSymbols）传入，这些 Symbols 会被复制到第一个参数（newObject）上。如果你不想要这种情况发生，就用 Obejct.defineProperty 来让这些 Symbols 变得不可迭代。

- Symbols 不能强制类型转换为原始对象。如果你尝试强制转换一个 Symbol 为原始值对象（+Symbol()、-Symbol()、Symbol() + 'foo'），将会抛出一个错误。这防止你将 Symbol 设置为对象属性名时，不小心字符串化了（stringify）它们。（译注：经 @Raoul1996 测试，Symbol 可以被转化为 bool 值（typeof !!Symbol('') === 'boolean'），因此原文作者在此的描述稍显武断）

- Symbols 不总是唯一的。上文中就提到过了，Symbol.for() 将为你返回一个不唯一的 Symbol。不要总认为 Symbol 具有唯一性，除非你自己能够保证它的唯一性。

# 作用

1. 作为一个可替换字符串或者整型使用的唯一值
2. 作为一个对象中放置元信息（metadata）的场所
3. 给予开发者在 API 中为对象添加钩子（hook）的能力

# 内置的 Symbols

- Symbol.hasInstance: instanceof

```
class MyClass {
    static [Symbol.hasInstance](lho) {
        return Array.isArray(lho);
    }
}
assert([] instanceof MyClass);
//调用rho[Symbol.hasInstance](lho)
```

- Symbol.iterator
  用于 for of 循环

- Symbol.isConcatSpreadable
  用于驱动了 Array#concat 的行为,是否会展平数组

字符串相关：

- Symbol.match
  定义自己的匹配规则而不使用正则表达式
- Symbol.replace
- Symbol.search
- Symbol.split

类相关：

- Symbol.species
  指向类的构造函数，ES6 中的 Array#map，以及其他所有的不可变 Array 方法（如 Array#filter 等），都已经更新到了使用 Symbol.species 属性来创建对象

- Symbol.toStringTag
  我们常用 Object.toString()来判断一个类型，现在可以通过 Symbol.toStringTag 控制返回值

```
class Collection {

  get [Symbol.toStringTag]() {
    return 'Collection';
  }

}
var x = new Collection();
Object.prototype.toString.call(x) === '[object Collection]'
```
