# Performance
当前页面中与性能相关信息

|API|descript|
|---|--------|
Performance.clearMarks()|将给定的 mark 从浏览器的性能输入缓冲区中移除。
Performance.clearMeasures()|将给定的 measure 从浏览器的性能输入缓冲区中。
Performance.clearResourceTimings()|从浏览器的性能数据缓冲区中移除所有 entryType 是 "resource" 的  performance entries。
Performance.getEntries()|基于给定的 filter 返回一个 PerformanceEntry 对象的列表。
Performance.getEntriesByName()|基于给定的 name 和 entry type 返回一个 PerformanceEntry 对象的列表。
Performance.getEntriesByType()|基于给定的 entry type 返回一个 PerformanceEntry 对象的列表
Performance.mark()|根据给出 name 值，在浏览器的性能输入缓冲区中创建一个相关的timestamp
Performance.measure()|在浏览器的指定 start mark 和 end mark 间的性能输入缓冲区中创建一个指定的 timestamp
Performance.now()|返回一个表示从性能测量时刻开始经过的毫秒数 DOMHighResTimeStamp
Performance.setResourceTimingBufferSize()|将浏览器的资源 timing 缓冲区的大小设置为 "resource" type performance entry 对象的指定数量
Performance.toJSON()|其是一个 JSON 格式转化器，返回 Performance 对象的 JSON 对象

# performance.timing
- domLoading：这是整个过程的起始时间戳，浏览器即将开始解析第一批收到的 HTML 文档字节。
- domInteractive：表示浏览器完成对所有 HTML 的解析并且 DOM 构建完成的时间点。
- domContentLoaded：表示 DOM 准备就绪并且没有样式表阻止 JavaScript 执行的时间点，这意味着现在我们可以构建渲染树了。
许多 JavaScript 框架都会等待此事件发生后，才开始执行它们自己的逻辑。因此，浏览器会捕获 EventStart 和 EventEnd 时间戳，让我们能够追踪执行所花费的时间。
- domComplete：顾名思义，所有处理完成，并且网页上的所有资源（图像等）都已下载完毕，也就是说，加载转环已停止旋转。
- loadEvent：作为每个网页加载的最后一步，浏览器会触发 onload 事件，以便触发额外的应用逻辑。