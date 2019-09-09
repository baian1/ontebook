# readPref()
- primary
- primaryPreferred
- secondary  
  用于分析数据时候,大量读取数据，不影响主节点
- secondaryPreferred
- nearest
  低延迟，速度快

bad：
- 主节点写入，副节点读取  其实主节点写入后会复制到辅助节点，i/o操作时一样的，不会提高性能

note：As of MongoDB 3.6, because of changes to both logic in chunk migration and read guarantees, it is now safe to read from secondaries as long as the appropriate read concern is specified.

数据的写入都是先到primary