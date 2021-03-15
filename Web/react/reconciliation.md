# reconciliation

## fiber-struct

结构

```js
{
    stateNode: new ClickCounter,
    type: ClickCounter,
    alternate: null,
    key: null,
    updateQueue: null,
    memoizedState: {count: 0},
    pendingProps: {},
    memoizedProps: {},
    tag: 1,
    effectTag: 0,
    nextEffect: null
}
```

1. alternate 关联workprocess和current树
2. effectTag 表示节点类型 1组件,2dom节点
3. nextEffect 遍历fiber树时,收集的需要对dom变更项
4. stateNode 使用ref引用该组件的
5. type 定义fiber类型,node节点,class组件的构造函数,fn组件,用于具体实例的创建
6. tag 元素的分类

   ```js
     IndeterminateComponent
     ClassComponent
     HostRoot
     HostComponent
     HostText
     HostPortal
     ForwardRef
     Fragment
     Mode
     ContextProvider
     ContextConsumer
     Profiler
     SuspenseComponent
     FunctionComponent
     MemoComponent
     LazyComponent
   ```

7. updateQueue state更新后的回调callback,dom的更新操作
8. memoizedState 更新过程中,表示当前页面的state状态
9. memoizedProps
10. pendingProps
11. key diff算法的标识

## Side Effect

react的函数组件负责使用state和props计算UI

任何dom变更和call生命周期方法都被称为副作用

nextEffect 链表表示 nodes that have DOM updates or other effects associated with them

## 渲染流程

1. render部分
   - beigin work 主要构建离屏的fiber tree，更新过程中，遇到子树不变的，就复用子树，mount会创建fiber节点，记录需要的操作(effectTag),Placement;Update;PlacementAndUpdate;Deletion.
   - complete work
     - 处理props变成 key,value ，放入updateQuene 方便commit更新dom时使用
     - 如果时mount，没有dom节点，创建dom节点，并将节点子孙节点插入，初始化dom对象内部监听事件
2. commit部分
   - before mutation阶段（执行DOM操作前）
     1. 处理DOM节点渲染/删除后的 autoFocus、blur 逻辑。
     2. 调用getSnapshotBeforeUpdate生命周期钩子。
     3. 调度useEffect。 延迟后之后commit之后执行所有回调，防止阻塞dom更新
   - mutation阶段（执行DOM操作）
     1. 更新ref，这个阶段ref为空
     2. 重置文本节点 特殊
     3. 根据之前的effectTag对dom节点操作，之后commitWork调用effect
        1. Placement effect替换节点
        2. update effect 改变dom属性，useLayoutEffect的销毁函数
        3. Deletion effect 移除fiber，解绑ref，useeffect 销毁函数
   - 改变current tree，保证did阶段的ref是新的
   - layout阶段（执行DOM操作后）
     1. commitAttachRef（赋值 ref）
     2. commitLayoutEffectOnFiber（调用生命周期钩子和hook相关操作）
     3. 执行classcompoent 的did生命周期，fn的useLayoutEffect hook的回调函数，开启调度useEffect的销毁与回调函数
