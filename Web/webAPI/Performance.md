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