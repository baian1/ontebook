# EventSource

与服务器建立一个长久的链接,数据格式 text/event-stream

传输的消息如有由事件字段,那么触发事件的字段与其相等,没有默认为 message

## 属性

- EventSource.readyState 只读
- EventSource.url 只读
- EventSource.withCredentials 只读

## 事件

- EventSource.onerror
- EventSource.onmessage
- EventSource.onopen
