#Data Stored
##Wired Tiger
将数据分成collection和index分别存储
默认都在db文件夹中  
--directoryperdb  
给dbs创建一个文件夹，存放collections和index  
--wiredTigerDirectoryForIndexes 
将collection和index分开存

分布优点:
多个disk可以同时I/O操作提高效率

## 数据存储
- mongod与disk直接互交  
  对于小文件操作
- RAM中转   
  数据再写入disk之前，会存到ram中，集群数据复制  
  使用writeConcern:{w:3}或者设置Checkpoint周期性同步和刷新数据
## journal 日志
  writeConcern:{j:true}在写数据时,需要等待数据被写入disk的日志中