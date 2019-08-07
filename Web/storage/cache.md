# Cache
用来缓存网络的数据

方法:
- Cache.match(request, options)  
返回一个 Promise对象，resolve的结果是跟 Cache 对象匹配的第一个已经缓存的请求。
- Cache.matchAll(request, options)  
返回一个Promise 对象，resolve的结果是跟Cache对象匹配的所有请求组成的数组。

  options:
  - ignoreSearch: true,
  - ignoreMethod: true,
  - ignoreVary: true

- Cache.add(request)  
抓取这个URL, 检索并把返回的response对象添加到给定的Cache对象.这在功能上等同于调用 fetch(), 然后使用 Cache.put() 将response添加到cache中.
- Cache.addAll(requests)  
抓取一个URL数组，检索并把返回的response对象添加到给定的Cache对象。
- Cache.put(request, response)  
同时抓取一个请求及其响应，并将其添加到给定的cache。
- Cache.delete(request, options)  
搜索key值为request的Cache 条目。如果找到，则删除该Cache 条目，并且返回一个resolve为true的Promise对象；如果未找到，则返回一个resolve为false的Promise对象。
- Cache.keys(request, options)  
返回一个Promise对象，resolve的结果是Cache对象key值组成的数组。

# CacheStorage
用来对Cache进行访问

- CacheStorage.match()  
检查给定的 Request 是否是 CacheStorage 对象跟踪的任何 Cache 对象的键，并返回一个resolve为该匹配的 Promise .
- CacheStorage.has()  
如果存在与 cacheName 匹配的 Cache 对象，则返回一个resolve为true的 Promise .
- CacheStorage.open()  
返回一个 Promise ，resolve为匹配  cacheName （如果不存在则创建一个新的cache）的 Cache 对象
- CacheStorage.delete()  
查找匹配 cacheName 的 Cache 对象，如果找到，则删除 Cache 对象并返回一个resolve为true的 Promise 。如果没有找到 Cache 对象，则返回 false.
- CacheStorage.keys()  
返回一个 Promise ，它将使用一个包含与 CacheStorage 追踪的所有命名 Cache 对象对应字符串的数组来resolve. 使用该方法迭代所有 Cache 对象的列表。