# createBrowserHistory

借助浏览器的history API实现路由功能

# 参数
```
const {
  forceRefresh = false,
  getUserConfirmation = getConfirmation,
  keyLength = 6
} = props;
```
- forceRefresh表示切换地址时强制刷新，请求网络资源
- getUserConfirmation使用自定义的确认窗，默认时windows.confirm
# transitionManager
用来管理地址的变化的一些操作
返回四个方法:
- appendListener 添加liste  rner  
  返回一个函数用来取消listerner
- notifyListeners 通知所有listerner

- setPrompt 修改Prompt函数的
- confirmTransitionTo 确认location是否变更

# getDOMLocation
将history传递数据的state参数绑定到location上,创建一个新的location返回

# createKey
用来创建一个随机的key放到location上去（？用途未知）

# setState
激活transitionManager.notifyListeners(history.location, history.action)

# handlePopState
history.replaceState与history.pushState发生时调用  
通过forceNextPop来以及弹窗来确认是否返回

# 暴露函数

## push
通过History.pushState创建了一个记录
## replace
通过History.replaceState覆盖记录
## 其他
其他History的函数包装

# block
这是在notified之前的  
用于弹出一些提示
```
// String形式
const unblock = history.block('Are you sure you want to leave this page?');

// 函数形式
history.block((location, action) => {
  if (input.value !== '') return 'Are you sure you want to leave this page?';
});
```