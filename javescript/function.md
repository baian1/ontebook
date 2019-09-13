# 函数构成

单定义了一个函数的时候

- [[FunctionLocation]] V8 的 C++ API 收集相关信息使用
- [[Scopes]] 保存闭包函数的作用域链
- arguments
- caller
- length 声明函数的时候的参数个数
- name 函数名
- \_\_prototy\_\_ 一些原型链上的方法
- prototype 作为构造函数使用的时候有用,其中 constructor 指向函数本身,可以用于 instanceof 判断类型

# length 属性

可以通过 function 对象的 length 判断他需要参数个数

# ()=>{}

箭头函数的 this 指向是绑定外层调用者的
