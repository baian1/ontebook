# Basic Commands

## db.\<method>()
与数据库互交

### 用户管理
- db.createUser()
- db.dropUser()
### Collection管理
- db.renameCollecution
- db.collection.createIndex()
- db.collection.drop()
### 数据库管理
- db.cropDatabase()
- db.createCollection()
### 数据库状态
- db.serverStatus()
### 数据库命令 用于底层互交
- db.runCommand({\<COMMAND>})
- db.commandHelp("\<command>")

Creating index with Database Command:  
```
db.runCommand(
  { "createIndexes": <collection> },
  { "indexes": [
    {
      "key": { "product": 1 }
    },
    { "name": "name_index" }
    ]
  }
)
```
Creating index with Shell Helper:
```
db.<collection>.createIndex(
  { "product": 1 },
  { "name": "name_index" }
)
```
## rs.\<method>()
副本部署和管理

## sh.\<method>()
控制分片集群