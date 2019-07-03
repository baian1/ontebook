# view
不用创建新的collection，从原有的数据上映射出来数据，用于只读
```
db.createView(<view>, <source>, <pipeline>, <collation> )
```

支持的操作:
- db.collection.find()
  find不支持操作符:
  - $
  - $elemMatch
  - $slice
  - $meta
- db.collection.findOne()
- db.collection.aggregate()
- db.collection.countDocuments()
- db.collection.estimatedDocumentCount()
- db.collection.count()
- db.collection.distinct()

创建的时候不支持使用:
- db.collection.mapReduce(),
- $text operator, since $text operation in aggregation is valid only for the first stage,
- $geoNear pipeline stage and the deprecated geoNear command.
