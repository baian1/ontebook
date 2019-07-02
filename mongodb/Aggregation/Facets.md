# Facets
像子流水线一样，每个facet都输入同样的文档，返回给各自的Field后组合返回
```
[
  { $facet:{
      <outputField1>: [ <stage1>, <stage2>, ... ],
      <outputField2>: [ <stage1>, <stage2>, ... ],
      ...
  }
}
]
```

## 不支持stage
- $facet
- $out
- $geoNear
- $indexStats
- $collStats

# Single Facet Query

## sortByCount
```
[
  {"$match": { "$text": {"$search": "network"}}},
  //查找offices.city字段，计数
  //类似于group中使用sum
  {"$sortByCount": "$offices.city"},
]
```

# Manual Buckets
```
{
  $bucket: {
    //按照哪个字段进行分桶
    groupBy: <expression>,
    //桶的边界,值类型不要相同
    boundaries: [ <lowerbound1>, <lowerbound2>, ... ],
    //未在桶内的文档
    default: <literal>,
    //假如没有输出,默认输出count,值为文档数量
    //自定义输出字段，类似于group的操作
    output: {
      <output1>: { <$accumulator expression> },
      ...
      <outputN>: { <$accumulator expression> }
    }
  }
}
```

```
//自动分桶
{
  $bucketAuto: {
    groupBy: <expression>,
    //表示分几个桶，自动确定边界
    buckets: <number>,
    output: {
      <output1>: { <$accumulator expression> },
      ...
    }
    //粒度属性,所有值均为数字可用
    //R系列,E系列,POWERSOF2
    granularity: <string>
  }
}
```