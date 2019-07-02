# 三种字段
- Field Path "$fieldName" 驼峰命名
- System Variable "$$CURRENT" 大写
- User Variable "$$foo" 小写

# $match
过滤数据

note:
1. 如果$match stage有$text操作,需要在第一个stage
2. $match需要
3. 使用与相同的query syntax进行查找
4. 不能同时使用$match和$match

# $project
删除和保留文档字段  
除了_id,其他不指定1字段都会删除
```
{
  _id:0
  name:1
}
```
创建新的文档字段并保留或者覆盖原有字段
```
{
  sum:{
    $size:"$writers"//获取数组长度返回
  }
}
```

# $addFields
类似于$project  
但是它只会添加或者修改现有的字段

# $sample
从文档中随机选择文档返回
如果满足三条:
1. $sample是第一个阶段
2. 返回数量少于文档总数5%
3. 集合有超过100个document  

使用伪随机游标来选择文档  
否则在内存中对所有文档进行随机排序选择N个文档(受内存限制)

# $goeNear
1. collection需要有一个2dsphere类型的索引
2. 必须作为第一阶段
3. 2dsphere类型坐标返回meter，legacy coordinate返回弧度