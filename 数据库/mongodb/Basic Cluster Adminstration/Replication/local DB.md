# oplog.rs

## oplog大小信息
```
var stats = db.oplog.rs.stats()  
stats.capped //oplog大小是否有上限
stats.size
stats.maxSize
```
## 运行规则
在满了之后，会从头开始复写  
当一个节点断线后，重连上匹配到最后一条oplog就会简单复制操作  
没有匹配到进入恢复模式

## 幂等性
oplog记录的不是来自客户端的操作  
比如更新100个数据  
oplog会记录一百次更新操作

## Local
这里的集合除了rs,都不会进行同步   
不要随意操作这里