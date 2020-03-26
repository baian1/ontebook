# Concurrent

react 的并发模式相关知识点

## lazy

动态加载

```js
import React, { lazy, Suspense } from "react";
const OtherComponent = lazy(() => import("./OtherComponent"));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent />
    </Suspense>
  );
}
```

## Suspense

一个 Suspense 下的所有 lazy 资源加载完,状态都为 resolve 才会显示 UI

对于嵌套 Suspense,资源都是同时请求的,按照树一个个创建节点,运行请求

### 简易实现

核心:

1. 错误边界捕获组件
2. 在子组件内的异步函数调用的时候:
   - 错误状态:`throw Promise` 抛出 reject 的 promise,会由错误捕获组件捕获并处理
   - 正确:`return result` 子组件会继续运行,render 走下去
   - pending:`throw Promise` 抛出正在进行的 promise,由错误捕获组件捕获,显示 callback 的组件
