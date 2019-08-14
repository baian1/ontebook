# 生命周期
- download 在调用 .register() 时，将下载您的第一个 Service Worker
- install 在首次注册的时候触发
- Activate 在 Service Worker 准备控制客户端并处理 push 和 sync 等功能事件时触发

## Clients.claim()
当一个 service worker 被初始注册时，页面在下次加载之前不会使用它。  
使用这个API可以强制service worker控制这个页面。  
在activate中使用

# 更新
以下情况下会触发更新：
- 导航到一个作用域内的页面。
- 更新 push 和 sync 等功能事件，除非在前 24 小时内已进行更新检查。
- 调用 .register()，如果 Service Worker 的网址已发生变化，那就会更新

什么情况会更新:
- 大部分浏览器（包括 Chrome 68 和更高版本）在检查已注册的 Service Worker 脚本的更新时，默认情况下都会忽略缓存标头。在通过 importScripts() 提取 Service Worker 内加载的资源时，它们仍会遵循缓存标头。您可以在注册 Service Worker 时，通过设置 updateViaCache 选项来替换此默认行为。
- 如果 Service Worker 的字节与浏览器已有的字节不同，则考虑更新 Service Worker。（我们正在扩展此内容，以便将导入的脚本/模块也包含在内。）


更新过程:
Install和Waiting ，新的worker被加载后不会激活，保持在waiting状态  
旧 Service Worker 退出时将触发 Activate，新 Service Worker 将能够控制客户端  
如果要跳过等待阶段可以在install中使用self.skipWaiting()

note: skipWaiting() 意味着新 Service Worker 可能会控制使用较旧 Worker 加载的页面。这意味着页面提取的部分数据将由旧 Service Worker 处理，而新 Service Worker 处理后来提取的数据。

## 手动更新
```
//调用update函数
navigator.serviceWorker.register('/sw.js').then(reg => {
  // sometime later…
  reg.update();
});
```

# fetch
FetchEvent事件
- FetchEvent.respondWith() 返回一个res给受控页面

属性：
- FetchEvent.request 请求相关属性

# ExtendableEvent.waitUntil() 
延迟状态的改变  
比如:install 事件相关联的 EventHandler 被调用时，它延迟将被安装的worker视为 installing,直到传入的promise对象返回resolve才会把server work的状态改变