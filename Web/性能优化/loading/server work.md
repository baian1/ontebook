# 注册服务时机
在用户首次访问的时候,我们的脚本要放在之后注册,以免抢占网络带宽减慢资源的下载速度  
后续访问时navigator.serviceWorker.register()已经注册了,就不会重新执行了

# 导航请求
每当您在浏览器的地址栏中输入网址、与 window.location 交互，或者从一个网页访问指向另一网页的链接时，就会执行导航请求

# 绕过网络进行导航

1. 流式传输组合响应  
  如果您的 HTML 可以自然拆分为多个较小的部分，每个部分都有静态页眉和页脚以及根据请求网址不同而异的中间部分，那么使用流式响应来处理导航最为理想。 