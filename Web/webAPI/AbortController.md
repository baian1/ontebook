# AbortController

控制 DOM 请求

## 用法

一个 AbortController

属性：  
AbortController.signal

方法：
AbortController.abort()

```Typescript
controller = new AbortController();

//将signal最为参数传给fetch
fetch(url, {controller.signal})
//调用abort中止请求
controller.abort
```
