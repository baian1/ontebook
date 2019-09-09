# change configure
rs.add("m103.mongodb.university:27014")  
rs.addArb("m103.mongodb.university:28000")  
添加节点

rs.remove("m103.mongodb.university:28000")  
删除节点

```
cfg = rs.conf()
cfg.members[3].votes = 0
cfg.members[3].hidden = true
cfg.members[3].priority = 0
rs.reconfig(cfg)
```
配置文件更改

# Failover and Elections
通过设置节点的priority  
0没有选举权限，默认都为1  
可以通过设置priority优先度，调用rs.stepDown()切换主要节点