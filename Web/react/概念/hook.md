# hook

放在 currentlyRenderingFiber.alternate 内保存第一个 hook

每个 Hook 的 next 接下一个,连成了一条链

currentHook 保存当前组件运行中的 hook

## 运行

1. 如果 currentHook 没有就去 currentlyRenderingFiber.alternate 获取第一个 hook,有的话就是 currentHook.next,
2. 通过不断调用 updateWorkInProgressHook,直到 next 为 null 后也会将 currentHook 设置为 null,这个时候相当于这个函数组件的 hook 已经走完了
