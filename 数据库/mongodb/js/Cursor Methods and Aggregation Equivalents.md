# Cursor Methods and Aggregation Equivalents
## Cursor Methods
.limit
.sort
.skip  
不需要注意顺序，结果都一样  
顺序错函数可能会出错
## Aggregation Equivalents
$limit
$sort
$skip

pip中的顺序很重要，操作是按顺序执行的  
比如在返回query前skip基本没用

- lookup
可以从另外的文档导入文件  
基础用法从一个collection中，导入localField=foreignField的collection到as指定的field中作为数组保存
```
{
   $lookup:
     {
       from: <collection to join>,
       localField: <field from the input documents>,
       foreignField: <field from the documents of the "from" collection>,
       as: <output array field>
     }
}
```

查询两个集合间不止一个相等匹配时用pipe  
let表示需要在pipe中使用到的变量，因为在里面是不能直接访问外部变量的  
在pipe中使用expr来接收let中的变量  
expr会返回表达式为true项
```
{
   $lookup:
     {
       from: <collection to join>,
       let: { <var_1>: <expression>, …, <var_n>: <expression> },
       pipeline: [ <pipeline to execute on the collection to join> ],
       as: <output array field>
     }
}
```


### Summary
- Aggregation is a pipelin
- Piplines are composed of one or more stages(由一个或多个阶段组成)
- Stages use one or more expressions(使用一个或多个表达式)
- Expressions are functions(表达式是函数)