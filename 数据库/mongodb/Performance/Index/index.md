# index
没有索引我们使用scan全部文件
有索引用索引搜索，B-tree构造
# 索引类型
## Single Field Indexes
- 最基础的索引
- db.\<collection>.createIndex({\<field>:\<direction>})
捕获单个field
- key特征
  - 来自几个field
  - 能找到一个唯一值在index字段
  - 能找到一个属性范围值
  - 能使用dot语法表述index索引子文档
  - 单个query可以找到几个不同值

## [Compound Index](https://docs.mongodb.com/manual/core/index-compound)
索引在内存中的是按一定序列排序的，一维数组  
按索引顺序排列，以(,)分割  
搜索的时候就是按顺序从前往后找，哪里断了就没了
## [多键索引](https://docs.mongodb.com/manual/core/index-multikey)
以其中一个field的数组创建，会为每一个值创建一个索引  
在这个基础上可以添加其他当个属性值(复合索引)
## [Partial Index](https://docs.mongodb.com/manual/core/index-partia)(局部索引)
将集合中的部分文档抽出来做出索引，搜索的时候匹配索引就可以自动使用

## [2dsphere](https://docs.mongodb.com/manual/core/2dsphere/)
create
```
db.collection.createIndex( { <location field> : "2dsphere" } )
```
insert
```
db.places.insert(
   {
      loc : { type: "Point", coordinates: [ -73.97, 40.77 ] },
      name: "Central Park",
      category : "Parks"
   }
)
```
create index
```
db.places.createIndex( { loc : "2dsphere" } )
```

## [Insensitive Indexes](https://docs.mongodb.com/manual/core/index-case-insensitive/)
使用了[Collatins](https://docs.mongodb.com/manual/reference/collation)  
排序规则允许用户为字符串设置比较规则，特定语言
可以在集合和索引两种级别定义规则

索引定义的规则{ collation: { locale: "fr" } }，  
如果要使用必须加上.collation( { locale: "fr" } )


## Text index
```
{
  _id:
  productName: "MongoDB Long Sleev T-shirt",
  category: "Clothing"
}
```
在使用一段字符搜索时,t-shirt  

正则  
find({productName:/T-shirt/});  
性能不佳

字符串索引  
createIndex({productNam:"text"})  
find({$text:{$search:"t-shirt"}})

服务器动作  
unicode考虑到使用空格和-作为分隔符
创建五个index
- mongoDB 
- long 
- sleeve
- t
- shirt

缺点
- 更多key选哟检查
- 更多index
- 更多时间去构建
- 减少写入性能

改善  
使用复合index可以减少索引的搜索规模

```
text:Mongo is nice
text:Mongo is bad
```
createIndex({text:"text"})

find($text:{$search:"mongo nice"})
返回两条，因为搜索的时候，空格表示或，搜索其中一个匹配

添加{score:{$neta:"textScore"}}返回项增加score字段，值为相关性小数  

使用sort({score:{$meta:"textScore"}})进行排序

# 索引操作
## 创建索引
db.\<collection>.createIndex()
可以使用点标识法创建索引文档中的子字段  

搜索的时候，索引存在会先过滤索引  
"stage": "IXSCAN",

然后剩余文档匹配字段  
"stage": "FETCH",

explain("executionStats")搜索相关信息

## [Sorting with Indexs](https://docs.mongodb.com/manual/tutorial/sort-results-with-indexes)
In memory sort
文件很多时操作昂贵

对输出文件排序，使用sort index可以减少资源消耗

```
db.<collection>.createIndex(
  { stars: 1 },
  { partialFilterExpression: {"start":[$exists:trus}]}}
)
```
想要使用局部索引，我们必须要是索引集合的子集  
上面我们创建了start存在的的局部索引  
需要用$exists:true才会触发index
```
find({start:{$gt:5,$exists:true}})
```

## 索引使用原理
query语句执行时，会从indexes表中搜索可以满足查询的索引  
从这些候选index中，经过实验找到最佳的使用  
并将其查询形状和index缓存  
缓存在下列情况清除
- restart 
- threshold 在是查询一部分时，工作表现差，效率超过预期计划10倍
- index rebuilt
- index create/drop

## 使用固定索引
hit
1. hit中加入索引名字
2. 使用索引排序
```
.hit(
  {name:1,zipcode:1}
)
```

# 索引资源
db.\<collection>.stats()  
{indexDetails:true}获取index的具体信息  
从返回对象的indexDetails中读取  

1. 硬盘空间  
空间不够的时候索引不会被创建  

2. RAM空间  
索引空间不够时，会不断遍历disk上的文件刷新内存中的数据

3. 边缘信息  
可以在内存中创建不完整index的情况  
- 一致增长的信息，我们需要查询的都是最新的，那么可以设置一个索引大小储存最新部分的索引
- BL Tole工具(**???**)  
  在primary创建索引用于支持特定scecondary节点的查找