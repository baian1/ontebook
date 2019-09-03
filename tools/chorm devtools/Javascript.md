# 断点

## 类型

有两类

- 基础断点
- 条件断点 需要输入

## chorme 断点

- 代码中直接打断点
- XHR/fetch Breakpoints 添加字符串,当请求 url 含有字符时触发
- DOM Breakpoints DOM 断点，在 dom 树中右键添加
- Global listeners
- Event Listener Breakpoints 事件断点

- 异常断点(六边形里有暂停的符号) 有未捕获的异常断电时暂停，可选发生 throw 就暂停

# 调试

- 步入，步出，跳过等按钮
- 开始暂停按钮 长按会出现 force 按钮选项
- 在代码上点击右键 continue to here 会使程序运行到指定位置，当其中有断点会暂停
- Restart Frame 断点所在函数重新执行

## 上下文

当有多个线程一起工作时，可以使用 Threads 改变线程

## 堆栈

可以通过点击跳到相应代码块

## {}

使压缩的代码可读

## 在线修改文件

修改了 js 源文件后可以通过 Ctrl+ S（Windows，Linux）进行保存。  
DevTools 会将整个 JS 文件修补到 Chrome 的 JavaScript 引擎中。

css 文件修改后不需要保存就会生效

## watch

自定义查看 js 表达式的值

# source code

在设置中开启 source map  
当读取编译文件的时候就可以在源文件上操作了  
报错等信息都会定位到源文件

# Snippets

js 代码段  
command 中使用!+filename 运行
command 中输入 snippest 打开面板

# Blackbox

将某个文件加入名单,将不会再那个文件中暂停
