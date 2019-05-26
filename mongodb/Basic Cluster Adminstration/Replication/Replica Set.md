# Replica Set

## primary
负责读写操作
## secondary
辅助结点复制信息，并在主节点故障后替代  
拥有投票能力，选出一个合适结点作为主结点  
具体操作与协议版本有关  

次要节点可以读取,但是无法写入  

集群节点数少于2时,主节点降低，无法写入，保证集群数据一致
## arbiter
不拥有数据  
可以投票选择主结点  
不可以成为主节点

## 节点
需要又奇数个节点
最多有50个节点  
其中只有7个可以是投票成员

## 设置
mongod启动配置
- security.keyFile  
用于我们节点间的身份认证
- replication.replSetName  
集群名字

## 集群配置
```
{
  _id: <string>//集合名字
  version: number//表示集合版本变化次数
  members: [
    {
      _id: <int>,
      host: <string>,
      arbiterOnly: <boolean>,//仲裁者,负责投票
      hidden: <boolean>,     //隐藏节点
      priority: <number>,         //投票时的优先度
      slaveDelay: <number>   //延迟同步数据
    }
  ]
}
```