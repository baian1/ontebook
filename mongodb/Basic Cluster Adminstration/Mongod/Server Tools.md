# Server Toole Overview

List mongodb binaries:
```
find /usr/bin/ -name "mongo*"
```

## mongostat

insert|query|update|delete|getmore|command|dirty|used|flushes|vsize|res|qrw|arw|net_in|net_out|conn|time|

## mongorestore and mongodump
数据是BSON二进制格式  

mongodump可以快速导出
```
mongodump --port 30000 --db applicationData --collection products
ls dump/applicationData/
cat dump/applicationData/products.metadata.json
```

mongorestore用于导入文件
```
mongorestore --drop --port 30000 dump/
```

## mongoexport and mongoimport
将数据以JSON格式导出
没有元数据
```
mongoexport --help
mongoexport --port 30000 --db applicationData --collection products
mongoexport --port 30000 --db applicationData --collection products -o products.json
```

没有指定的时候默认存在tset db中，集合名为文件名
```
mongoimport --port 30000 products.json
```