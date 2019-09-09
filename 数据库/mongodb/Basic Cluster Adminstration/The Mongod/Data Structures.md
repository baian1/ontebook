# Data Stryctures
数据保存为表
使用数据库时是隐式的

## index
使用询问语句时，mongdb会判断能不能用index来查询  
不能用index时会线性遍历集合，速度很慢  
索引占用内存,添加索引后，添加会删除collection会更新所有index，消耗资源

## 数据存储  
B-tree方式保存