# [Stack reconciler](https://reactjs.org/docs/implementation-notes.html)

# Fiber reconciler

## 遍历规则

- child — reference to the first child
- sibling — reference to the first sibling
- return — reference to the parent

1. 使用三个指针，以链表的方式遍历，不会有过多堆栈
2. dfs 遍历，遍历的时候执行 work，然后遍历其子元素
3. 在该层没有 sibling 后执行 didXXX 生命周期

## Current and work in progress trees

current tree 是被渲染到界面的树,反应了实际 UI  
work in progress trees 是更新的时候用到的树，从 current 树拷贝节点，然后应用更新，最后用来替代 current 树

两颗树对应节点相互引用

## Effects list

在更新的时候遍历树，统计出会有副作用(state 或 props 改变)的节点,将其存放在列表中,该列表是一个单向链表,附在根元素上,用 nextEffect 连接

finishedWork 树,是 workInProgress 的子集，并使用连接 nextEffect 属性

## Fiber node structure

```
//组件
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
//DOM节点
{
  stateNode: new HTMLSpanElement,
  type: "span",
  alternate: null,
  key: "2",
  updateQueue: null,
  memoizedState: null,
  pendingProps: {children: 0},
  memoizedProps: {children: 0},
  tag: 5,
  effectTag: 0,
  nextEffect: null
}
```

- stateNode  
  对组件，DOM 节点或与光纤节点关联的其他 React 元素类型的类实例的引用。
- type  
  对于类组件，它指向构造函数，对于 DOM 元素，它指定 HTML 标记。
- tag  
  表示节点类型，比如 ClickCounter component 是 1,span 是 HostComponent,用 5 表示
- updateQueue  
  state updates, callbacks and DOM updates.
- memoizedState 和 memoizedProps  
  渲染到 UI 的树的状态
- pendingProps  
  将要被更新子组件和 dom 的 data
- key  
  diff 时使用

## 整体算法

render 和 commit

### render

React 在可用的时间内能处理一个或多个 fiber 节点，然后停止来保存完成的工作并妥协于一些事件（比如优先级高的 UI 事件），它之后可以在之前离开的方法在继续执行，然而有时可能会丢弃已完成的工作，并从顶层重来。

1. 执行 setState
2. React.render 返回的元素创建一个新的 fiber 节点，并统计有副作用的节点

获得 Effects list

相关生命周期:

- getDerivedStateFromProps
- shouldComponentUpdate
- render

```
//用来遍历fiber节点,isYieldy标识时间,时间耗尽时会暂停工作
function workLoop(isYieldy) {
  if (!isYieldy) {
    while (nextUnitOfWork !== null) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
  } else {...}
}
```

遍历更新所有节点，完成

- performUnitOfWork
- beginWork
- completeUnitOfWork
- completeWork

### commit

commit 阶段总是同步的，因为这个阶段的执行的工作会导致用户可见的变化，这也是为什么 React 一把完成它们的原因。

执行需要的更新，用新树替代 current 树，渲染到 UI

相关生命周期:

- getSnapshotBeforeUpdate
- componentDidMount
- componentDidUpdate
- componentWillUnmount

执行的主要操作

- getSnapshotBeforeUpdate 在标记有 Snapshot 效果的节点上调用生命周期方法
- componentWillUnmount 在标记有 Deletion 效果的节点上调用生命周期方法
- 执行所有 DOM 插入，更新和删除
- 将 finishedWork 树设置为当前树
- componentDidMount 在标记有 Placement 效果的节点上调用生命周期方法
- componentDidUpdate 在标记有 Update 效果的节点上调用生命周期方法

## setState 更新过程

1. setState 会将任务加入 fiber 节点 updateQueue 内
2. react 进入 render 状态,开始从顶层 Fiber 遍历,(会跳过已经处理的 fiber 节点,直接到 setState 节点)
3. beginWork 中根据节点类型选择更新方式,比如 ClassComponent 采用 updateClassComponent 进行更新,实例不存在 i 新建实例并挂在,实例存在,但是节点不存在 resumeMountClassInstance,都存在就更新 updateClassInstance

   1. updateClassInstance 操作

   - 调用 updateQueue 中的回调生成 state
   - 调用 getDerivedStateFromProps
   - 调用 shouldComponentUpdate
   - 确定 componentDidUpdate 参数,在 commit 阶段调用
   - 更新组件实例的 state 和 props

   例子

   ```
   //更新前
   {
     effectTag: 0,
     elementType: class ClickCounter,
     firstEffect: null,
     memoizedState: {count: 0},
     type: class ClickCounter,
     stateNode: {
       state: {count: 0}
     },
     updateQueue: {
       baseState: {count: 0},
       firstUpdate: {
         next: {
           payload: (state, props) => {…}
         }
       },
       ...
     }
   }
   //更新后
   {
     //effectTag=4表示更新该节点
     effectTag: 4,
     elementType: class ClickCounter,
     firstEffect: null,
     memoizedState: {count: 1},
     type: class ClickCounter,
     stateNode: {
       state: {count: 1}
     },
     updateQueue: {
       baseState: {count: 1},
       firstUpdate: null,
       ...
     }
   }
   ```

   2. 最后调用 nextUnitOfWork=finishClassComponent(XXX)遍历子节点，比较节点，判断更新等
   3. 返回 nextUnitOfWork,用以在工作循环中进行处理

4. 用有副作用的节点构建 effect list
5. commit 阶段遍历 effect list

```
function commitRoot(root, finishedWork) {
  //查找Snapshot效果并调用该getSnapshotBeforeUpdate方法
  commitBeforeMutationLifecycles()
  //根据虚拟dom节点的属性,对实际节点做出操作
  commitAllHostEffects();
  //更新current树
  root.current = finishedWork;
  //调用did的生命周期
  commitAllLifeCycles();
}
```
