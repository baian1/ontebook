# File Structure

## WiredTiger.lock文件锁  
防止两个mongod进程指向这个文件夹  

## wt文件  
数据文件：collection和index都有各自的集合

## diagnostic.data Dir  
诊断信息捕获

## journal  
日志文件  
mongod每次写操作将会保存在内存中，60s刷新一次或者2GB大小
journal 预写到磁盘 50s一次  
意外崩溃后 会在wiredTigerLog中寻找数据并恢复操作

## 日志文件

## mongodb-27017.sock
MongoDB使用的socket通讯文件，用于进程间通讯