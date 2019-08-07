# 函数构成
单定义了一个函数的时候
- [[FunctionLocation]] V8的C++ API收集相关信息使用
- [[Scopes]] 保存闭包函数的作用域链
- arguments
- caller
- length 声明函数的时候的参数个数
- name 函数名
- \_\_prototy__ 一些原型链上的方法
- prototype 作为构造函数使用的时候有用,其中constructor指向函数本身,可以用于instanceof判断类型

# length属性
可以通过function对象的length判断他需要参数个数

# ()=>{}
箭头函数的this指向是绑定外层调用者的