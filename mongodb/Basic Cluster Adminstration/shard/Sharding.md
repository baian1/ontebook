# 目的
集群需要每个机器都有完整的数据，随着数据的变大，我们可能需要提高机器性能，通过加内存，提高cpu性能等方式   
然而当我们使用云服务器时，往往不能实现硬件的更新，  
这时候就需要有一种方式扩展  
sharding就是基于此诞生的，能将数据分布到不同的地方

# 需要使用场景
1. 增加硬件性能可以解决，但不经济
2. 数据过大，备份困难

优点
1. 更好的单线程操作，聚合
2. 地理位置信息

# 结构
shards集群包含数据分片，config server拥有每个分片的元数据，mongos通过查询路由到正确的分片   
primary shard，该集群中非分片数据都将在保存在这个碎片上  
当查询不到分片数据时，会查询所有分片并合并

# 配置分片集群
需要一个csrs集群存放配置信息  
更新集群配置,先重启次要节点更新配置，然后进入主要节点选举，改为second节点，重启配置  
使用mongos添加分片集群

# config DB
不用操作，mongos自己维护
- database  
  每个集群是否分片
- collections
  分片信息
- Shards
  每个集群配置
- Chunks
  分片的具体信息
- Mongos

# shard key
数据分块,key需要存在于每个document  

依靠key来管理数据属于哪一块，划分边界

shard key和他的值 都无法更改

## how to shard
允许数据库可以分片
```
sh.enableSharding("m103")
```
创建分片key索引,然后分片
```
db.products.createIndex( { "sku" : 1 } )
sh.shardCollection("m103.products", {"sku" : 1 } )
```

## pick a good shark key

- cardinality  
  数据不同可能性要多，有利于分片
  比如boolean只有true和false不利于分片
- Frequency  
  分片可以将操作分流，如果一个分片查询集中在一个分片中，这是不利的  
  平均分布的操作频率有利于提高性能
- type of change  
  分片key是有范围的，如果key单调递增，数据就会集中在一个shard中，

可以使用复合字段key

## hashed shard key
让有序增加的index分散到不同分片

使用
```
createIndex({"<field>":"hashed"})
sh.shardCollection(
  "<database>.<collection>",{<shard key field>:"hashed"}
)
```

缺点：
1. 不适合进行范围查询
2. 失去地理查询这种独立的读写操作，没办法合适隔离分组
3. 不能创建散列复合索引，不能是素组
4. 不能index排序

## Chunks
例子  
以last names分片  
Shard|Data
---|---
1|A-J
2|K-R
3|S-Z

默认大小64mb 超过自动分割  
块大小可以改变  块会自动平衡到不同shard上

数据的上限等于下限时，数据过多，会变成jumbo chunks，指超出单个chunk大小限制  
不会被分割，也不会被平衡，不会被移动

通过复合键来解决

## Balancing
balancer round  
平衡器发现不平衡  
开始移动 一次移动 shard数量/2  
自动拆分块
```
sh.startBalancer(timeout,interval)
sh.stopBalancer(timeout,interval)
sh.setBalancerState(boolean)
```

Primary of the CSRS 负责运行平衡器

## queries in a shrded cluster

一张list of shards用于查询

- sort  
  每个分片shard返回后再一次sort返回client
- limit
  每个分片触发一次，然后和一起再一次触发
- skip
  对返回结果跳过，没有对shard操作

## Routed Queries vs Scatter Gather
- target queries需要shard key
- 范围查询可能有shard key可会查询每个分片
- 没有shark key将进行scatter-gather查询，全部文档找一遍比较慢