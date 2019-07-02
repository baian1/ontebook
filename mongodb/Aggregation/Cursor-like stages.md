# Cursor-like stages
类似查询语句中的跳过,排序,限制数量等  
- $sort  
可以使用indexes进行排序,会快点  
在退出index后使用会在内存从中进行排序,内存最大限制为100mb,  
大量使用资源时设置{allowDiskUse: true}允许使用disk,否则命令将中止
- $skip
- $limit
- $count
