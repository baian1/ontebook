# worker
创建一个进程在后台  
new Worker(url)创建  
使用构造函数（例如,Worker()）创建一个 worker 对象, 构造函数接受一个 JavaScript文件URL — 这个文件包含了将在 worker 线程中运行的代码。worker 将运行在与当前 window不同的另一个全局上下文中，这个上下文由一个对象表示，标准情况下为DedicatedWorkerGlobalScope

主线程和 worker 线程相互之间使用 postMessage() 方法来发送信息, 并且通过 onmessage 这个 event handler来接收信息（传递的信息包含在 Message 这个事件的data属性内) 。数据的交互方式为传递副本，而不是直接共享数据。

## 属性
- AbstractWorker.onerror  
当ErrorEvent 类型的事件冒泡到 worker 时，事件监听函数 EventListener 被调用. 它继承于 AbstractWorker.
- Worker.onmessage  
当MessageEvent类型的事件冒泡到 worker 时，事件监听函数 EventListener 被调用.  例如，一个消息通过 DedicatedWorkerGlobalScope.postMessage，从执行者发送到父页面对象，消息保存在事件对象的 data 属性中.
- Worker.onmessageerror
当messageerror 类型的事件发生时，对应的EventHandler 代码被调用。

## 方法
- Worker.postMessage()  
发送一条消息到最近的外层对象，消息可由任何 JavaScript 对象组成。
- Worker.terminate()  
立即终止 worker。该方法不会给 worker 留下任何完成操作的机会；就是简单的立即停止。Service Woker 不支持这个方法。

## [Web Workers可用的函数和类](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers)

## 例子
```
//worker.js
onmessage = function(e) {
  console.log('Worker: Message received from main script');
  let result = e.data[0] * e.data[1];
  if (isNaN(result)) {
    postMessage('Please write two numbers');
  } else {
    let workerResult = 'Result: ' + result;
    console.log('Worker: Posting message back to main script');
    postMessage(workerResult);
  }
}
```
```
//main.js
const first = document.querySelector('#number1');
const second = document.querySelector('#number2');

const result = document.querySelector('.result');

if (window.Worker) {
  const myWorker = new Worker("worker.js");

  first.onchange = function() {
    myWorker.postMessage([first.value, second.value]);
    console.log('Message posted to worker');
  }

  second.onchange = function() {
    myWorker.postMessage([first.value, second.value]);
    console.log('Message posted to worker');
  }

  myWorker.onmessage = function(e) {
    result.textContent = e.data;
    console.log('Message received from worker');
  }
} else {
  console.log('Your browser doesn\'t support web workers.')
}
```