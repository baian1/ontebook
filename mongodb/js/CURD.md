# CURD

## Write


### Durable Write
表示在返回前写入几个副本  
使用Write Concern控制  
默认w为1，表示写入除primary之外的一个副本  
可以使用major写入所有，或者指定数字写入

## update
插入操作使用insertOne或insertMany  
使用update {upsert: true}表示文档不存在的时候创造文档

## read
### Joins
将两个文档数据混合返回  
使用$lookup

## Delete
