# Tree-shaking

用来消除不会用到的代码，减少代码体积

## DCE(Dead Code)

- 代码不会被执行，不可到达
- 代码执行的结果不会被用到
- 代码只会影响死变量（只写不读）

静态语言中的死区代码由编译器进行删除

## ES6 module

- 只能作为模块顶层的语句出现
- import 的模块名只能是字符串常量
- import binding 是 immutable 的

es6 是静态的，与运行时的状态无关，可以进行可靠的静态分析，这是 tree-shaking 的基础

## 工作原理

1. 每一个 module 文件，module scope 是一种根作用域
2. 每一个{}都会产生一个 scope，class 和 function 作用域可以直接导出
3. 通过 escope 进行 AST 分析，通过导出作用域，分析导入变量被引用，那些没有被引用。
4. 导出合适的代码

参考:  
1.[webpack 如何通过作用域分析消除无用代码](https://diverse.space/2018/05/better-tree-shaking-with-scope-analysis)  
2.[Better tree shaking with deep scope analysis](https://medium.com/webpack/better-tree-shaking-with-deep-scope-analysis-a0b788c0ce77)

# 库支持

## webpack

1. 嵌套的export的引用

   ```js
   // inner.js
   export const a = 1;
   export const b = 2;

   // module.js
   export * as inner from './inner';
   // or import * as inner from './inner'; export { inner };

   // user.js
   import * as module from './module';
   console.log(module.inner.a);
   ```

2. Inner-module tree-shaking

   ```js
   import { something } from './something';

   function usingSomething() {
     return something;
   }

   export function test() {
     return usingSomething();
   }
   ```

3.

# 注意事项

1. IIFE 立即执行函数不会被清除，如果 IIFE 的返回函数没有地方调用,才可以删除
2. `/*#__PURE__*/`可以将函数标记为无副作用

```
var q = /*#__PURE__*/Math.floor(a/b)
export default q;
```

如果没有添加/_#\_\_PURE\_\__/标记,那他可能有副作用,在 q 没有被用到的时候,q 将被抛弃,然而 Math.floor(a/b)将被保留,因为不知道这个函数的执行会不会影响到全局变量,通过添加 PURE 标记,可以使其与 q 一起被舍去
