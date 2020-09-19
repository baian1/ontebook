# Using Bind Mounts

在使用docker中,需要将一些数据持久化,那么就要将数据存储在本机上.

1. Named Volumes
    - docker 创建host location
    - 挂载命令 `my-volume:/usr/local/data`
    - 创建
    - 支持volume drivers
2. Bind Mounts
    - 自定义host location
    - 挂载命令 /path/to/data:/usr/local/data