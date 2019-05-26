# Write Concerns
- 0 不等待承诺接收到
- 1 等待主节点的承诺
- >=2 等待次要节点承诺个数
- "majority" 等待所有节点

## option
- wtimeout 限制写入时间，超时不意味着失败，只是在规定时间内没有写完
- j (WiredTiger预写日志)true数据直接保存到硬盘日志，false会将数据存在内存中，直到写入成功