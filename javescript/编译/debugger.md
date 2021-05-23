# debugger

当我们运行代码出现问题时,通过console.log打印日志,不能很好的展现当时的环境,通过debugger,我们可以对那一刻的环境有更清晰的认知.

参考：

1. [Debugger 原理揭秘](https://zhuanlan.zhihu.com/p/372135871?utm_source=qq&utm_medium=social&utm_oi=703260335347347456)

## 代码执行方式

1. 直接执行，代码被打包成二进制的可执行文件，可以直接cpu的机器指令
2. 解释执行，代码解释成字节码，解释器读取执行字节码(解释器是二进制的可执行文件)

## debugger原理

### 可执行文件

cpu读取文件后会不停地执行,一句一句往下.
使用中断,可以暂停cpu的执行

不同的中断编号,有不同的中断处理程序.INT3 可以触发debugger中断.

通过在运行时替换执行文件的内容,cpu遇到INT3执行,就中断了.
同样,在释放断点的时候,将替换的机器码换回去,就可以继续执行了
(不理解,后续阅读其他材料)

### 解释型语言

编译型语言因为直接在操作系统之上执行,所以要利用 cpu 和操作系统的中断机制和系统调用来实现 debugger。但是解释型语言是自己实现代码的解释执行的,所以不需要那一套,但是实现思路还是一样的,就是插入一段代码来断住,支持环境数据的查看和代码的执行,当释放断点的时候就继续往下执行.

比如 v8 引擎会把设置断点、获取环境信息、执行脚本的能力通过 socket 暴露出去,socket 传递的信息格式就是 [v8 debug protocol](https://github.com/buggerjs/bugger-v8-client/blob/master/PROTOCOL.md).

![v8 执行](./v8%20execute.png)

client客户端(devtools,vscode...)通过与v8通过,就可以debugger js代码了
