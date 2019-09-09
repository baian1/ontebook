# combining
结合字段的操作
# group
_id唯一值  
如果多个文档具有相同值那就会执行运算操作
```
{ "_id" : 1, "item" : "abc", "price" : 10, "quantity" : 2, "date" : ISODate("2014-03-01T08:00:00Z") }
{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "date" : ISODate("2014-03-01T09:00:00Z") }
{ "_id" : 3, "item" : "xyz", "price" : 5, "quantity" : 10, "date" : ISODate("2014-03-15T09:00:00Z") }
{ "_id" : 4, "item" : "xyz", "price" : 5, "quantity" : 20, "date" : ISODate("2014-04-04T11:21:39.736Z") }
{ "_id" : 5, "item" : "abc", "price" : 10, "quantity" : 10, "date" : ISODate("2014-04-04T21:23:13.331Z") }
```

```
[
  {
    $group : {
        //_id字段，分配文档
        _id : { month: { $month: "$date" }, day: { $dayOfMonth: "$date" }, year: { $year: "$date" } },
        //sum累加每个匹配文档，multiply相乘
        totalPrice: { $sum: { $multiply: [ "$price", "$quantity" ] } },
        //平均每个匹配的文档quantity
        averageQuantity: { $avg: "$quantity" },
        //每匹配一个文档字段值+1
        count: { $sum: 1 }
    }
  }
]
```
获得
```
//从结果上看,文档数量减少了，totalPrice为每个匹配相同_id的文档的price*quantity和
{ "_id" : { "month" : 3, "day" : 15, "year" : 2014 }, "totalPrice" : 50, "averageQuantity" : 10, "count" : 1 }
{ "_id" : { "month" : 4, "day" : 4, "year" : 2014 }, "totalPrice" : 200, "averageQuantity" : 15, "count" : 2 }
{ "_id" : { "month" : 3, "day" : 1, "year" : 2014 }, "totalPrice" : 40, "averageQuantity" : 1.5, "count" : 2 }
```

## 注意
表达式缺失或者字段缺失会导致返回null

# unwind
对数组使用的,将其分解为多个文档，每个文档包含数组的一个元素  
使用方式
```
//要分解的字段
$unwind:<field path>

$unwind: {
  path: <field path>
  //将索引保存在字段里
  includeArrayIndex: <string>
  //是否返回该字段为null或空数组
  preserveNullAndEmptyArrays: <boolean>
}
```

# lookup
可以连接多个表数据

note:
1. from指定的collection不能是分片数据
2. 同一数据库
```
{
  $lookup:{
    from: <collection to join>,
    localField: <field from the input documents>,
    foreignField: <field from the documents of the "from" collection>,
    as: <output array field>
  }
}
```

# graphLookup
类似于相当于lookup的增强版

可以递归一层层查找,适用于树结构或图结构
```
{
  $graphLookup: {
    from: <collection>,
    //现在所在数据库的起始递归查找字段
    startWith: <expression>,
    //进入递归查找后，查找到的文档的字段,继续递归查找的新起点
    connectFromField: <string>,
    //需要匹配的目标字段
    connectToField: <string>,
    //保存数据到哪里
    as: <string>,
    //可以进行递归的深度
    maxDepth: <number>,
    //depth字段保存深度，表示需要几次递归才能到达
    depthField: <string>,
    //限制匹配的文档数据
    restrictSearchWithMatch: <document>
  }
}
```