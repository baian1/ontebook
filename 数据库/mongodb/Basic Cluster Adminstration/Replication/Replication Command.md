# rs.status()  
描述了心跳，最后一次同步时间，保存间隔时间等

# rs.isMaster()  
关于副本集本身的信息

# db.serverStatus()['repl']
相较于上一个命令多了  
rbid:number  
rollback在这个节点发送次数

# rs.printReplicationInfo()
返回：
size 
该oplog实践第一次时间，最后一次时间，现在时间    
预计写满时间

oplog会刷新，都是会改变的