# 定时器

定时器偶尔会在绘画帧的时候执行,导致浏览器没有重绘,出现页面的卡顿

将定时器放在 requestAnimationFrame 中

# 巨大的计算量

长期执行 JS 任务会阻塞线程,可以使用 worker 线程进行 CPU 密集型计算

# 避免强制同步

浏览器工作流程是首先 JavaScript 运行，然后计算样式，然后布局

但是当 js 改变了元素的样式,并且 js 中需要根据元素的样式获取信息,那就会导致元素强制布局,然后再执行 JS,再次布局

正确操作是先进行读取样式的操作,然后进行样式更改等其他操作

# 避免局部抖动

```js
function resizeAllParagraphsToMatchBlockWidth() {
  // Puts the browser into a read-write-read-write cycle.
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.width = box.offsetWidth + "px";
  }
}
```

每次循环,我们需要读取 box.offsetWidth,然后该变一个元素的 width

但是改变 width 后如果需要再次读取 box.offsetWidth 就必须先进行布局,这样就导致了性能浪费

保证安全可以使用[FastDOM](https://github.com/wilsonpage/fastdom)

# 避免在输入事件中改变样式

比如再 input 事件,滚动事件中改变了样式,又在 requestAnimationFrame 回调开始时读取样式,那就会触发制同步布局

# 使滚动处理程序去除抖动

存储事件值并在下一个 requestAnimationFrame 回调中处理样式更改

```js
function onScroll(evt) {
  // Store the scroll value for laterz.
  lastScrollY = window.scrollY;

  // Prevent multiple rAF callbacks.
  if (scheduledAnimationFrame) return;

  scheduledAnimationFrame = true;
  requestAnimationFrame(readAndUpdatePage);
}

window.addEventListener("scroll", onScroll);
```
