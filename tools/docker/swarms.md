# Swarms

设置集群，用以均衡负载

1. 通过 docker-machine create 创建 VM
2. 设置一个主要的 leader,其他 node 作为节点加入(docker-machine ssh 与 VM 通讯)(docker-machine env XXXX 设置 node 的环境变量)
3. docker swarm init 设置主要节点,其他节点通过 docker swarm join 加入
4. 完成集群设置

5. 在主要集群中通过 docker stack deploy -c docker-compose.yml getstartedlab 来使服务运行在集群上面

# Docker Machine

- 在 Mac 或 Windows 上安装并运行 Docker
- 设置和管理多个远程 Docker 主机
- 供应群群集
