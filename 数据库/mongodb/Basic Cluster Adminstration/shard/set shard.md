# shard
需要一个mongos节点来连接crfs集群
需要一个csrs集群来管理分片数据库数据,存储索引表
需要一个shard集群提供数据存储

csrs  
配置集群名加上 比如m103-csrs,方便识别  
sharding.clusterRole配置 configsvr  
开启三个服务器,配置集群  

例子:
1. crsr配置
```
sharding:
  clusterRole: configsvr
replication:
  replSetName: m103-csrs
security:
  keyFile: /var/mongodb/pki/m103-keyfile
net:
  bindIp: localhost,192.168.103.100
  port: 26001
systemLog:
  destination: file
  path: /var/mongodb/db/csrs1.log
  logAppend: true
processManagement:
  fork: true
storage:
  dbPath: /var/mongodb/db/csrs1
```
启动配置，设置集群

2. mongos配置
```
sharding:
  configDB: m103-csrs/192.168.103.100:26001,192.168.103.100:26002,192.168.103.100:26003
security:
  keyFile: /var/mongodb/pki/m103-keyfile
net:
  bindIp: localhost,192.168.103.100
  port: 26000
systemLog:
  destination: file
  path: /var/mongodb/db/mongos.log
  logAppend: true
processManagement:
  fork: true
```
通过mongs连接到db
```
vagrant@m103:~$ mongo --port 26000 --username m103-admin --password m103-pass --authenticationDatabase admin
```

3. 分片集群配置
```
sharding:
  clusterRole: shardsvr
storage:
  dbPath: /var/mongodb/db/node1
  wiredTiger:
    engineConfig:
      cacheSizeGB: .1
net:
  bindIp: 192.168.103.100,localhost
  port: 27011
security:
  keyFile: /var/mongodb/pki/m103-keyfile
systemLog:
  destination: file
  path: /var/mongodb/db/node1/mongod.log
  logAppend: true
processManagement:
  fork: true
replication:
  replSetName: m103-repl
```
用配置启动三个节点,设置集群

4. mongos添加分片集群
sh.addShard("m103-repl/192.168.103.100:27012")

5. 添加shard
现在已经添加了一个分片集群  
可以使用addShard添加更多分片集群来达到数据分块目的