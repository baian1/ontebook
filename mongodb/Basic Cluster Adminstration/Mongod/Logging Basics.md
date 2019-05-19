# Logging Basics

db.runCommand({"getLog":"global"})//获得日志  
tail -f /data/db/mongod.log //获得日志，跟踪文件变化  
db.getLogComponents()//获得设置  
db.setLogLevel(0, "index")//设置log等级


## Log Verbosity Level
-1:Inherit from parent
0:Default Verbosity,to include Information messages
1-5:increases the verbosity level to include Debug messages

## Log Message Severity Level
- F - Fatal
- E - Error
- W - Warning
- I - Informational(Verbosity Level 0)
- D - Debug(Verbosity Level 1-5)
## LOG
```
 "2019-05-17T23:44:02.452+0800 I COMMAND  [conn2] successfully set parameter logComponentVerbosity to { index: { verbosity: -1.0 } } (was { verbosity: 0, accessControl: { verbosity: -1 }, command: { verbosity: -1 }, control: { verbosity: -1 }, executor: { verbosity: -1 }, geo: { verbosity: -1 }, index: { verbosity: -1 }, network: { verbosity: -1, asio: { verbosity: -1 }, bridge: { verbosity: -1 } }, query: { verbosity: -1 }, replication: { verbosity: -1, heartbeats: { verbosity: -1 }, rollback: { verbosity: "
 ```
 2019-05-17T23:44:02.452+0800 操作时间
 I 信息
 COMMAND 命令
 conn2 连接标识

## configuration
```
systemLog ：
  verbosity ： <int> 
  quiet ： <boolean> 
  traceAllExceptions ： <boolean> 
  syslogFacility ： <string> 
  path ： <string> 
  logAppend ： <boolean> 
  logRotate ： <string> 
  destination ： <string> 
  timeStampFormat ： <string> 
  component ：
    accessControl ：
      verbosity ： <int> 
    command：
      verbosity ： <int>
```


