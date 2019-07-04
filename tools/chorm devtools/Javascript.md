# 断点

## 类型
有两类
- 基础断点
- 条件断点 需要输入

## chorme断点
- 代码中直接打断点
- XHR/fetch Breakpoints 添加字符串,当请求url含有字符时触发
- DOM Breakpoints DOM断点，在dom树中右键添加
- Global listeners
- Event Listener Breakpoints 事件断点

- 异常断点(六边形里有暂停的符号) 有未捕获的异常断电时暂停，可选发生throw就暂停

# 调试
- 步入，步出，跳过等按钮
- 开始暂停按钮 长按会出现force按钮选项
- 在代码上点击右键 continue to here会使程序运行到指定位置，当其中有断点会暂停
- Restart Frame 断点所在函数重新执行

## 上下文
当有多个线程一起工作时，可以使用Threads改变线程

## 堆栈
可以通过点击跳到相应代码块

## {}
使压缩的代码可读

## 在线修改文件
修改了js源文件后可以通过Ctrl+ S（Windows，Linux）进行保存。  
DevTools会将整个JS文件修补到Chrome的JavaScript引擎中。

css文件修改后不需要保存就会生效

## watch
自定义查看js表达式的值

# source code
在设置中开启source map  
当读取编译文件的时候就可以在源文件上操作了  
报错等信息都会定位到源文件

# Snippets
js代码段  
command中使用!+filename运行
command中输入snippest打开面板