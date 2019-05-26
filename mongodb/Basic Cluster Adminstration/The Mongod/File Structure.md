# File Structure

## WiredTiger.lock文件锁  
防止两个mongod进程指向这个文件夹  

## wt文件  
数据文件：collection和index都有各自的集合

## diagnostic.data Dir  
诊断信息捕获

## journal 日志文件
collection每60s创建一个检查点
mongod每次写操作将会先保存在内存中，
然后wiredTigerLog 50ms一次同步到WiredTigerLog日志文件，大小限制为100mb,使用file rotation method将数据同步写入到磁盘中  
意外崩溃后 会先搜索上一个检查点，然后与日志中的标识符匹配到检查点，从这个位置开始恢复操作


## mongodb-27017.sock
MongoDB使用的socket通讯文件，用于进程间通讯