# [Profiling the Database](https://docs.mongodb.com/manual/tutorial/manage-the-database-profiler/)

db.getProfilingLevel()
db.setProfilingLevel(1,{"slowns":100})
db.getCollectionStatus()

启用会会产生一个system.profile

Level|Description
|----|-----------|
0|	The profiler is off and does not collect any data. This is the default profiler level.
1|The profiler collects data for operations that take longer than the value of slowms
2|The profiler collects data for all operations.


```
db.system.profile.find().pretty()
{
  "op": "insert",//操作名字
  "ns": "test.products",//操作文件
  "command": {
    "insert": "products",
    "ordered": true,
    "lsid": {
      "id": UUID("2d554532-89ce-4d87-bf29-be548b4ce590")
    },
    "$db": "test"
  },//command指令
  "ninserted": 1,
  "keysInserted": 1,//key
  "numYield": 0,//消耗时间
  "locks": {
    "Global": {
      "acquireCount": {
        "r": NumberLong(1),
        "w": NumberLong(1)
      }
    },
    "Database": {
      "acquireCount": {
        "w": NumberLong(1)
      }
    },
    "Collection": {
      "acquireCount": {
        "w": NumberLong(1)
      }
    }
  },
  "responseLength": 45,
  "protocol": "op_msg",
  "millis": 0,
  "ts": ISODate("2019-05-18T02:56:32.030Z"),
  "client": "127.0.0.1",
  "appName": "MongoDB Shell",
  "allUsers": [],
  "user": ""
}
```

## configuration
operationProfiling:
  mode: string
  slowOpThresholdMs: int
  slowOpSampleRate: double
  
|Level	|Description|
|-------|-----------|
off|The profiler is off and does not collect any data. This is the default profiler level.
slowOp|The profiler collects data for operations that take longer than the value of slowms.
all|The profiler collects data for all operations.