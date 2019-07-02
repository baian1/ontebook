# WebScoket
## 状态常量
Constant|Value
--|--
WebSocket.CONNECTING|0
WebSocket.OPEN|1
WebSocket.CLOSING|2
WebSocket.CLOSED|3

## 属性
只读
- WebSocket.bufferedAmount 表示被send放到队列而没有发送的数据
- WebSocket.extensions 服务器选择的扩展
- WebSocket.protocol 服务器选择的下属协议
- WebSocket.readyState 当前的链接状态
- WebSocket.url WebSocket 的绝对路径

## 事件
- close
用于指定连接关闭后的回调函数
- error
用于指定连接失败后的回调函数
- message
用于指定当从服务器接受到信息时的回调函数
- open
用于指定连接成功后的回调函数

## 方法
- WebSocket.close([code[, reason]])
关闭当前链接
- WebSocket.send(data)
向服务器发送数据