# 改变加载情况

## 模拟连接

offline 设置离线，  
选项设置模拟网速

## 设置选项

- presever log 刷新保留资源
- Disable cache 不保存缓存

## 清除缓存刷新

长按刷新键

# 资源

可以在第一栏右键开启不同的选项卡

## 屏幕捕获

开启屏幕捕获可以确定不同阶段，资源加载情况不同时的页面状态

## 详情

- Headers
- Preview
- Response 左下角按钮可以进行格式化
- timing  
  资源获取的时间详情，用不同的颜色标识不同阶段

# 搜索请求头和响应头

比如输入 Cache-Control 就会在资源详情里面搜索相关信息

## 过滤

输入 文字或正则表达式  
会匹配 name,domain

其他过滤选项:

- domain. Only display resources from the specified domain. You can use a wildcard character (_) to include multiple domains. For example, _.com displays resources from all domain names ending in .com. DevTools populates the autocomplete dropdown menu with all of the domains it has encountered.
- has-response-header. Show the resources that contain the specified HTTP response header. DevTools populates the autocomplete dropdown with all of the response headers that it - has encountered.
- is. Use is:running to find WebSocket resources.
- larger-than. Show resources that are larger than the specified size, in bytes. Setting a value of 1000 is equivalent to setting a value of 1k.
- method. Show resources that were retrieved over a specified HTTP method type. DevTools populates the dropdown with all of the HTTP methods it has encountered.
- mime-type. Show resources of a specified MIME type. DevTools populates the dropdown with all MIME types it has encountered.
- mixed-content. Show all mixed content resources (mixed-content:all) or just the ones that are currently displayed (mixed-content:displayed).
- scheme. Show resources retrieved over unprotected HTTP (scheme:http) or protected HTTPS (scheme:https).
- set-cookie-domain. Show the resources that have a Set-Cookie header with a Domain attribute that matches the specified value. DevTools populates the autocomplete with all of the cookie domains that it has encountered.
- set-cookie-name. Show the resources that have a Set-Cookie header with a name that matches the specified value. DevTools populates the autocomplete with all of the cookie names that it has encountered.
- set-cookie-value. Show the resources that have a Set-Cookie header with a value that matches the specified value. DevTools populates the autocomplete with all of the cookie values that it has encountered.
- status-code. Only show resources whose HTTP status code match the specified code. DevTools populates the autocomplete dropdown menu with all of the status codes it has encountered.

## 阻止请求

测试某些资源不能加载时页面的状况  
run command + block  
需要输入资源的完整名字进行匹配，不能用正则，可以用通配符\*

还可以在资源上右键 block

# 常见问题

## 一个域名 6 个连接并行连接后，其他资源会等待

- 使用多个子域名一起下载
- 使用 HTTP2
- 删除或推迟不必要的下载

## Slow Time To First Byte(TTFB)

原因

1. 建立连接时间久
2. 服务器响应慢

解决

1. 使用 CDN
2. 优化数据库查询，使用缓存或增强服务器配置等

## Slow content download

原因：

1. 连接的传输速度缓慢
2. 内容过大

解决：

1. 考虑在 CDN 上托管您的内容或更改托管服务提供商
2. 通过优化请求发送更少的字节
