# 执行
每当目标(target)元素与设备视窗或者其他指定元素发生交集的时候执行。  
设备视窗或者其他元素我们称它为根元素或根(root)。

# option
- root 一个元素,用于判断和观察元素的交际 
- rootMargin root元素的外边距,用作root元素和target发生交集时候的计算交集的区域范围。
- threshold 单一的number也可以是number数组，target元素和root元素相交程度达到该值的时候IntersectionObserver注册的回调函数将会被执行

# 回调函数
```
//一个是加入观察的元素数组
//一个是定义的观察者
var callback = function(entries, observer) { 
  entries.forEach(entry => {
    // Each entry describes an intersection change for one observed
    // target element:
    //   entry.boundingClientRect
    //   entry.intersectionRatio
    //   entry.intersectionRect
    //   entry.isIntersecting
    //   entry.rootBounds
    //   entry.target
    //   entry.time
  });
};
```