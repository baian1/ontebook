# anime
在html之前我们的动画普遍使用css动画或者js定时器动画

html5新增了requestAnimationFrame  
专门用来处理动画  

## 语法
window.requestAnimationFrame(callback);
参数  
callback 下一次重绘之前更新动画帧所调用的函数(即上面所说的回调函数)。该回调函数会被传入DOMHighResTimeStamp参数，该参数与performance.now()的返回值相同，它表示requestAnimationFrame() 开始去执行回调函数的时刻。

window.cancelAnimationFrame()用于取消还没有执行的的回调函数

## 使用
通过在回调函数内修改DOM对象属性，重新渲染实现页面变更  
动画就是通过不断更改DOM属性并刷新来做的