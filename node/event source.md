# kafka

消息传递系统，可以在系统之间安全地传递数据

## Glossary

![kafka架构](https://pic1.zhimg.com/80/v2-4692429e9184ed4a93911fa3a1361d28_hd.jpg)

- Zookeeper kafka 集群依赖 zookeeper 来保存集群的的元信息，来保证系统的可用性。
- Cluster 多个 broker 的集群
- Broker Broker 是 kafka 实例，每个服务器上有一个或多个 kafka 的实例
- Partition Topic 的分区，每个 topic 可以有多个分区，分区的作用是做负载，提高 kafka 的吞吐量。
- Replication 每一个分区都有多个副本，副本的作用是做备胎。当主分区（Leader）故障的时候会选择一个备胎（Follower）上位，成为 Leader。
- Leader
- Follower

- Topic 消息的主题，可以理解为消息的分类，kafka 的数据就保存在 topic。在每个 broker 上都可以创建多个 topic。
- Message 每一条发送的消息主体

- Producer 消息的产生者，是消息的入口
- Consumer 消息的消费方，是消息的出口
- Consumer Group 多个消费组组成一个消费者组,同一个消费者组的消费者可以消费同一个 topic 的不同分区的数据，提高了 kafka 的吞吐量
- Group Coordinator 使用者组中的一个实例，负责将要使用的分区分配给组中的使用者

- Offset Partition log 中的某个点。 当 consumer 使用了一条消息时，它“提交”该偏移量，这意味着它告诉 broker 该 consumer group 已经使用了该消息。 如果 consumer group 重新启动，它将从最高提交偏移量重新启动。
- Rebalance 当 consumer 加入或离开 consumer group 时（例如在引导或关闭过程中），该组必须“重新平衡”，这意味着必须选择 Group Coordinator，并且需要将 partitions 分配给 consumer group 的成员。
- Heartbeat 集群了解哪些消费者还活着的机制。 每隔一段时间（heartbeatInterval），每个 consumer 都必须向 cluster leader 发送心跳请求。 如果某个时间段内未执行此操作（sessionTimeout），则将其视为无效，并将其从 consumer group 中删除，从而触发重新平衡。
