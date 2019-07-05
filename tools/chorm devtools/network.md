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
比如输入Cache-Control就会在资源详情里面搜索相关信息

## 过滤
- 文字或正则 过滤的使name
- 域 过滤domain

## 阻止请求
测试某些资源不能加载时页面的状况  
run command + block   
需要输入资源的完整名字进行匹配，不能用正则，可以用通配符*

还可以在资源上右键block

# 常见问题

## 一个域名6个连接并行连接后，其他资源会等待
- 使用多个子域名一起下载
- 使用HTTP2
- 删除或推迟不必要的下载

## Slow Time To First Byte(TTFB)
原因
1. 建立连接时间久
2. 服务器响应慢

解决  
1. 使用CDN
2. 优化数据库查询，使用缓存或增强服务器配置等

## Slow content download
原因：  
1. 连接的传输速度缓慢
2. 内容过大

解决：  
1. 考虑在CDN上托管您的内容或更改托管服务提供商
2. 通过优化请求发送更少的字节