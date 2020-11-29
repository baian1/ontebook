# debug

线上的debug主要还是以来日志文件进行的,通过日志重现操作来debug

## 日志管理

成熟工具:

- ELK Stack

### 日志类型

- AccessLog: 这是最常见的日志类型，一般在 nginx 等方向代理中也有日志记录，但在业务系统中有时需要更详细的日志记录，如 API 耗时，详细的 request body 与 response body
  - morgan
- SQLLog: 关于数据库查询的日志，记录 SQL、涉及到的 table、以及执行时间，从此可以筛选出执行过慢的SQL，也可以筛选出某条API对应的SQL条数
- RequestLog: 请求第三方服务产生的日志,这一步需要注入requestId,传递,组成全链路
- Exception: 异常
- RedisLog: 缓存，也有一些非缓存的操作如 zset 及分布式锁等
- Message Queue Log: 记录生产消息及消费消息的日志
- CronLog: 记录定时任务执行的时间以及是否成功
- 关键业务逻辑

### 日志的基本字段

- app 当前项目名
- serverName 服务器的hostname
- timestamp 日志产生的时间
- requestId/traceId 全链路式日志中的唯一id
  - zipkin
  - jaeger
- label 日志的类型
- userId 用户信息

### 前端日志

1. 可以采用Beacon发送信息

## 业界方案

- 微软的[Time Travel Debugging](https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/time-travel-debugging-overview)
- firefox的[Recording Firefox](https://github.com/rr-debugger/rr/wiki/Recording-Firefox)
- 美团的[RDebug](https://github.com/didi/rdebug)

## 调试器

- LLDB
- LLnode
