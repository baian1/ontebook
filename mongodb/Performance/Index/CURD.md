# CURD
## index
index建立经验法则  
equal sort range  
因为只有查询相等或者sort才会在index中进行,如果执行了range查询再sort,会导致在内存中进行排序
## Covered Queries
假如通过指定相应字段为1,index包含了所有查询的信息，会直接返回不去查询doc 
如果指定字段0，由于不能确定剩余字段，会查询文档  

不适用情况
- 嵌套数组
- 嵌套对象
- 不包含分片键

## Regex
使用索引,并指定开头,可以减少搜索范围

## insert
索引过多会影响性能  
写关注会受到集群间的通讯的影响

## Date Type Inplications
1. 搜索的时候数据类型必须匹配
2. 排序方式，按数值类型分类，再进行排序
  1. MinKey
  2. Null
  3. Numbers(ints,longs,doubles,decimals)
  4. Symbol,String
  5. Object
  6. Array
  7. BinData
  8. ObjectId
  9. Boolean
  10. Date
  11. Timestamp
  12. Regular Expression
  13. MaxKey

  可以通过创建index，排序类型选为数字类型解决

需要关注问题
- 客户端数据一致性
- 结果排序
- 查询正确性
- 使用相同数据结构，代码可以更简单
- 在收集文档时使用文档验证

## Aggregation
为了使用index进行检索排序  
将匹配和排序放在前面

将限制数量和排序放在前面，服务器会调用top-k sort，只允许内存中存在10个文档

最终返回文档小于16mb，过程中可以大于16mb，但要小于100mb,allowDiskUse可以突破(最好不要，性能会降低)

脱离index搜索之后进入stage就不会再去使用index