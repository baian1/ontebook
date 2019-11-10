# Worker

开辟一个线程运行 js 代码,不会阻塞 ui 线程

## 事件

- AbstractWorker.onerror  
  运行 worker 报错
- Worker.onmessage  
  message 通讯,用于接收 DedicatedWorkerGlobalScope.postMessage 发送的信息
- Worker.onmessageerror  
  接收 messageerror 信息

## 方法

- Worker.postMessage()  
  给 worker 发送信息
- Worker.terminate()  
  终止 worker
