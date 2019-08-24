# 缓存类型

- 私有缓存  
  属于个人的缓存,不会被分享给陪人
- 共享缓存  
  也叫代理缓存,是代理服务器提供缓存给用户,减少网络拥堵

# 缓存对象

缓存的请求一般都是 get 请求

# 缓存控制

Cache-Control 字段,HTTP/1.1 中规定的

1. 可缓存性

- no-store  
  每次请求都需要服务器响应具体文件
- no-cache  
  每次请求都需要验证缓存,缓存没有改变就返回 304 取出本地缓存

- private|public  
  缓存,私有或公共

2. 到期

- max-age=\<seconds>  
  表示返回请求的有效时间，时间是相对于请求的时间
- s-maxage=\<seconds>  
  覆盖 max-age 或者 Expires 头，但是仅适用于共享缓存(比如各个代理)，私有缓存会忽略它。

3. 重新验证和重新加载

- must-revalidate  
   一旦资源过期（比如已经超过 max-age），在成功向原始服务器验证之前，缓存不能用该资源响应后续请求。
- proxy-revalidate  
  与 must-revalidate 作用相同，但它仅适用于共享缓存（例如代理），并被私有缓存忽略。

# 协商缓存与强缓存

强缓存会使用户直接取到浏览器的缓存，不会请求服务器

1. cache-control: max-age=xxxx，public  
   客户端和代理服务器都可以缓存该资源；
   客户端在 xxx 秒的有效期内，如果有请求该资源的需求的话就直接读取缓存,statu code:200 ，如果用户做了刷新操作，就向服务器发起 http 请求
2. cache-control: max-age=xxxx，private  
   只让客户端可以缓存该资源；代理服务器不缓存
   客户端在 xxx 秒内直接读取缓存,statu code:200
3. cache-control: max-age=xxxx，immutable  
   客户端在 xxx 秒的有效期内，如果有请求该资源的需求的话就直接读取缓存,statu code:200 ，即使用户做了刷新操作，也不向服务器发起 http 请求
4. cache-control: no-cache  
   跳过设置强缓存，但是不妨碍设置协商缓存；一般如果你做了强缓存，只有在强缓存失效了才走协商缓存的，设置了 no-cache 就不会走强缓存了，每次请求都回询问服务端。
5. cache-control: no-store  
   不缓存，这个会让客户端、服务器都不缓存，也就没有所谓的强缓存、协商缓存了。

协商缓存就是通过请求服务器,确认缓存是不是新的,不是新的返回新的缓存,是新的返回 304

1. etag 文件的唯一标识,优先度较高
2. last-modified 文件最后修改时间
