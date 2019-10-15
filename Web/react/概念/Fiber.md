# 遍历规则

- child — reference to the first child
- sibling — reference to the first sibling
- return — reference to the parent

1. 使用三个指针，以链表的方式遍历，不会有过多堆栈
2. dfs 遍历，遍历的时候执行 work，然后遍历其子元素
3. 在该层没有 sibling 后执行 didXXX 生命周期
