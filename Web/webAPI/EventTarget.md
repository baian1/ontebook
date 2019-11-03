# EventTarget

## 构造函数

```Typescript
var EventTarget = function() {
  this.listeners = {};
};
```

## 方法

- EventTarget.addEventListener()

  ```Typescript
  EventTarget.prototype.addEventListener = function(type, callback) {
    if(!(type in this.listeners)) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);
  };
  ```

- EventTarget.removeEventListener()

  ```Typescript
  EventTarget.prototype.removeEventListener = function(type, callback) {
    if(!(type in this.listeners)) {
      return;
    }
    var stack = this.listeners[type];
    for(var i = 0, l = stack.length; i < l; i++) {
      if(stack[i] === callback){
        stack.splice(i, 1);
        return this.removeEventListener(type, callback);
      }
    }
  };
  ```

- EventTarget.dispatchEvent()

  ```Typescript
  EventTarget.prototype.dispatchEvent = function(event) {
    if(!(event.type in this.listeners)) {
      return;
    }
    var stack = this.listeners[event.type];
    event.target = this;
    for(var i = 0, l = stack.length; i < l; i++) {
        stack[i].call(this, event);
    }
  };
  ```

## Related pages for DOM Events

- CompositionEvent 用于处理用户间接输入文字的事件。
- FoucusEvent 接口表示和焦点相关的事件比如 focus, blur, focusin, 和 focusout。
- InputEvent 接口用来构造和字符输入相关的事件对象。
- KeyboardEvent
- MouseEvent
- MouseScrollEvent 已在标准中删除
- ProgressEvent 是一个用来测量底层操作进度的接口，可以测量 HTTP 请求（例如：一个 XMLHttpRequest 请求、或者一个底层资源如 \<img>, \<audio>, \<video>, \<style> or \<link>).
- UIEvent 接口表示简单的用户界面事件。
- WheelEvent DOM 事件会在用户滚动鼠标滚轮或操作其它类似鼠标的设备时触发。
