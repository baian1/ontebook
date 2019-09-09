# Replication
mongod  管理多个结点
主节点负责与上层互交，辅助结点同步数据
挂了一个自动切换到辅助结点(又辅助结点投票产生)  
结点恢复后，自动加入，并通过同步保持数据一致

## 数据复制方法
- Binary Replicution
在写入数据后  
通过检查数据文件中确切更改的字节  
在Binary Log中记录更改  
辅助结点通过接收Log改变数据  
note:
需要环境严格一致  
优点：
1.数据量少
2.速度快
- Statement-Based Replication
在用wirte写入数据后  
保存这条语句到Oplog中  
辅助接点同步Oplog来保持数据一直  
优点：对机器限制少