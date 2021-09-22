# 打开面板
1. 打开专用的 Console 面板
  - 按 Ctrl+Shift+J (Windows / Linux) 或者 Cmd+Opt+J (Mac)。
  - 如果 DevTools 已打开，则按 Console 按钮。
2. 以抽屉式导航栏形式打开
  - 在 DevTools 处于聚焦状态时按 Esc。
  - 按 Customize and control DevTools 按钮，然后按 Show console。

# log messages
## 添加事件戳
在设置的console模块开启Show timestamps

## 修改执行环境
适用于iframe等窗口套窗口

## 过滤
- 按照文字过滤  
  Fliter中可以使用正则匹配，字符串
- 按照日志级别过滤  
  - Verbose
  - Info
  - Warning
  - Error

  日志类型：
    - Errors console.error()
    - Warnings console.warn() 
    - Info console.info() 
    - Logs console.log() 
    - Debug console.timeEnd() 和console.debug()
- 按照消息源过滤
- 按照url过滤,输入url:,在url前添加-可以去除相关url的消息
# 设置选项
- Hide network messages
- Log XMLHttpRequests
等