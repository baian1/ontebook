# AbortController
控制DOM请求

## 用法
一个AbortController

属性：  
AbortController.signal

方法：
AbortController.abort()

```
controller = new AbortController();

//将signal最为参数传给fetch
fetch(url, {controller.signal})
//调用abort中止请求
controller.abort
```
