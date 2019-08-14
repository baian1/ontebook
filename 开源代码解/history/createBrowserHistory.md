# createBrowserHistory

借助浏览器的 history API 实现路由功能

# 参数

```
const {
  forceRefresh = false,
  getUserConfirmation = getConfirmation,
  keyLength = 6
} = props;
```

- forceRefresh 表示切换地址时强制刷新，请求网络资源
- getUserConfirmation 使用自定义的确认窗，默认时 windows.confirm

# transitionManager

用来管理地址的变化的一些操作
返回四个方法:

- appendListener 添加 listerner  
  返回一个函数用来取消 listerner
- notifyListeners 通知所有 listerner

- setPrompt 修改 Prompt 函数的
- confirmTransitionTo 确认 location 是否变更

# getDOMLocation

将 history 传递数据的 state 参数绑定到 location 上,创建一个新的 location 返回

# createKey

用来创建一个随机的 key 放到 location 上去（？用途未知）

# setState

激活 transitionManager.notifyListeners(history.location, history.action)

# handlePopState

history.replaceState 与 history.pushState 发生时调用  
通过 forceNextPop 来以及弹窗来确认是否返回

# 暴露函数

## push

通过 History.pushState 创建了一个记录

## replace

通过 History.replaceState 覆盖记录

## 其他

其他 History 的函数包装

# block

这是在 notified 之前的  
用于弹出一些提示

```
// String形式
const unblock = history.block('Are you sure you want to leave this page?');

// 函数形式
history.block((location, action) => {
  if (input.value !== '') return 'Are you sure you want to leave this page?';
});
```
