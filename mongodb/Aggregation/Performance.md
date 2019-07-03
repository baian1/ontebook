# index usage
使用index可以显著增加速度

# top-k sorting
使用limit和sort一起的查询是非索引查询中最快的

# memory constraints
- 返回的单个文档16mb限制，过程不受限制
- 每个stage有100mb的ram限制

# aggregation pipeline on a sharded cluster
```
//有分片索引address.state
[
  //使用了match可以通过route匹配到一个shard上直接提取数据
  {
    $match:{'address.state':'NY'}
  },
  //如果没有使用上面的match 查询索引
  //那就会在每个shard上进行计算
  //然后汇总结果到一个地方
  {
    $group:{
      _id:'$address.state',
      avgStars:{ $avg:'$stars'}
    }
  }
]
```
通常情况下，数据的合并是在随机shard上进行的  
如下情况在主分片上进行：
- $out
- $facet
- $lookip
- $graphLookup

# 自动优化
```
[
  {
    $sort: { start : -1 }
  },
  {
    $match: { cuisine: 'Sushi' }
  }
]
优化----->
[
  {
    $match: { cuisine: 'Sushi' }
  },
  {
    $sort: { start : -1 }
  }
]
```
```
[
  {
    $skip: 10
  },
  {
    $limit: 5
  }
]
优化----->
[
  {
    $limit: 15
  },
  {
    $skip: 10
  }
]
```
相似的有两个相连的skip会合并到一起，limit也会合并，match也会

# avoid unnecessary stages
减少不必要的stage，stage中可以通过$xxx直接调用某个field
```
{
  $project:{
    $title_size:{ $size:{split:["$title," " ] } }
  }
},
{
  $group: {
    _id:"title_size",
    count:{$sum:1}
  }
}
优化----->
{
  $group: {
    _id:{ $size: { split:["$title," " ] } },
    count:{$sum:1}
  }
}
```