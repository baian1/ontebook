# immer

不变的数据,某个数据改变返回一个新的不变数据,在结构上共享一些数据.

## 实现思路

对一个数据进行操作的时候会创建一个 proxy 副本,并标记该点为 modify,最后完成后收集所有节点,非 modify 使用原来的节点,modify clone proxy 副本
