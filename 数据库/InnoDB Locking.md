# 共享锁和排他锁

- 共享锁(shared (S) locks)  
  读的时候会给数据上锁,不允许其他事务进行数据修改
- 排他锁(exclusive (X) locks)  
  写数据的时候，其他事务不能对数据进行读写

# 意向锁

- 意向共享锁 (Intention shared (IS)) 将要去获取某一行的共享锁。
- 意向排它锁 (Intention exclusive (IX)) 将要去获取某一行的排它锁。

在读写前会有意向锁,表示有操作在进行  
当有些操作冲突的时候会阻止操作

# 记录锁

# 间隙锁

# 自增锁
