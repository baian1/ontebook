# before sharding
- 硬件限制
- 需要判断数据的增长形式，如何访问

# client请求
使用skip和limit会传递到分片，  
每个分片运行，然后集合在primary上返回

# buik 写入
写入数据将被mongos分到不同分片上  
如果布置在不同机器上，会有网络延迟