# [RPC(Remote Procedure Call)](https://www.geeksforgeeks.org/remote-procedure-call-rpc-in-operating-system/)

用于扩展传统的本地过程调用

实现 **调用过程** 与 **被调用过程** 不必存在于相同的地址空间中

一个 API 对应一个函数

## 机制

![Working of RPC](./Working_of_RPC.png)

client:

1. Client 调用方法,传递参数
2. Client stub 包装方法和参数
3. RPC Runtime 通过网络传递数据

server:

1. Server 传入参数,调用方法
2. Server stub 将结果包装
3. RPC Runtime 通过网络传递数据

## 解决问题的方法

1. Call ID 映射,用于在 client 和 server 中确定对应的函数
2. 序列化和反序列化 通常客户端和服务端是两种不同的语言,需要对参数进行序列化,传递到对面后通过反序列化为自己能读取的数据
3. 网络传输,客户端和服务端进行通讯.客户端传递 Call ID 和序列化后的参数字节流,服务端返回序列化后的调用结果
