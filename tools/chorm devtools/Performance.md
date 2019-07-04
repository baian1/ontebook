# 获取信息
点击record开始录制信息
- screenshots 记录每帧动画
- 垃圾桶强制辣鸡收集
- Disable JavaScript samples 省略了JS调用堆栈，不去记录他，只会显示Event和Function Call 
- Enable advanced paint instrumentation 开启后就可以在Frames中查看每帧页面了

# 性能记录分析
选择任务

在Overview中选择范围  
点击Main section，展开  
使用WASD来选择，或者使用鼠标

ctrl+F打开搜索，可以使用正则或字符，匹配任务名

使用shift+鼠标左键来选择一个范围

## 查看任务活动
- 如果要查看导致最多工作的根活动，请使用“Call Tree”选项卡。
- 如果要查看直接花费最多时间的活动，请使用“Bottom-Up”选项卡。
- 如果要按录制期间的活动顺序查看活动，请使用“Event Log”选项卡。

## 任务分类
- main 主进程
- GPU
- Raster
- Interaction 互交事件
- network 网络请求相关信息
  - left line 是连接请求开始前的时间，大概是拼接嵌套字啥的
  - light portion 表示Request Sent and Waiting (TTFB)
  - dark portion 表示内容下载
  - right line 等待主线程的事件 

# 相关事件
常见时间线事件的属性:
|属性                     |显示事件                                                                  |
|------------------------|--------------------------------------------------------------------------|
|Aggregated time         |对于带嵌套事件的事件，每个类别的事件所用的时间。                              |
|Call Stack              |对于带子事件的事件，每个类别的事件所用的时间。                                |
|CPU time                |记录的事件所花费的 CPU 时间。                                               |
|Details                 |有关事件的其他详细信息。                                                    |
|Duration (at time-stamp)|事件及其所有子事件完成所需的时间，时间戳是事件发生的时间（相对于记录开始的时间）。|
|Self time               |事件（不包括任何子事件）花费的时间。                                          |
|Used Heap Size          |记录事件时应用使用的内存大小，以及自上次采样以来已使用堆大小的增减 (+/-) 变化。  |

## Loading
事件：
- Parse HTML
  Chrome 执行其 HTML 解析算法。
- Finish Loading
  网络请求已完成。
- Receive Data
  请求的数据已被接收。存在一个或多个 Receive Data 事件。
- Receive Response
  请求的初始 HTTP 响应。
- Send Requset
  网络请求已被发送。

事件属性：
- Resource  
请求的资源的网址。
- Preview	  
  请求的资源的预览（仅图像）。
- Request Method   
  用于请求的 HTTP 方法（例如，GET 或 POST）。
- Status Code	HTTP  
  响应代码。
- MIME Type   
  请求的资源的 MIME 类型。
- Encoded Data Length   
  请求的资源的长度（以字节为单位）。

## Scripting
事件：
- Animation Frame Fired  
  预定的动画帧被触发，其回调处理程序被调用。
- Cancel Animation Frame  
  预定的动画帧被取消。
- GC Event  
  发生垃圾回收。
- DOMContentLoaded	  
  浏览器触发 DOMContentLoaded。当页面的所有 DOM 内容都已加载和解析时，将触发此事件。
- Evaluate Script	  
  脚本已被评估。
- Event	JavaScript 事件  
  如，“mousedown”或“key”。
- Function Call	  
  发生顶级 JavaScript 函数调用（只有浏览器进入 JavaScript 引擎时才会出现）。
- Install Timer  
  已使用 setInterval() 或 setTimeout() 创建定时器。
- Request Animation Frame	requestAnimationFrame()  
  调用已预定一个新帧。
- Remove Timer  
  之前创建的定时器已被清除。
- Time  
  一个脚本调用了 console.time()
- Time End  
  一个脚本调用了 console.timeEnd()
- Timer Fired  
  使用 setInterval() 或 setTimeout() 创建的定时器已被触发。
- XHR Ready State Change	XMLHTTPRequest  
  的就绪状态已发生变化。
- XHR Load	XMLHTTPRequest  
  已结束加载。

事件属性：
- Timer ID	  
  定时器 ID。
- Timeout	  
  定时器指定的超时。
- Repeats	  
  指定定时器是否重复的布尔值。
- Function Call	  
  已调用一个函数。

## Rendering
事件属性：
- Invalidate layout	  
  页面布局被 DOM 更改声明为无效。
- Layout	  
  页面布局已被执行。
- Recalculate style	Chrome     
  重新计算了元素样式。
- Scroll	  
  嵌套视图的内容被滚动。

属性
- Layout invalidated	  
  对于 Layout 记录，导致布局失效的代码的堆叠追踪。
- Nodes that need layout	  
  对于 Layout 记录，被标记为需要在重新布局启动前布局的节点的数量。正常情况下，这些代码是被开发者代码声明为无效的代码，以及向上追溯到重新布局根目录的路径。
- Layout tree size	  
  对于布局记录，重新布局根目录下节点（Chrome 启动重新布局的节点）的总数。
- Layout scope	  
  可能的值为“Partial”（重新布局边界是 DOM 的一部分）或“Whole document”。
- Elements affected  
  对于 Recalculate 样式记录，受样式重新计算影响的元素的数量。
- Styles invalidated	  
  对于 Recalculate 样式记录，提供导致样式失效的代码的堆叠追踪。

## painting
属性
- Composite Layers	  
  Chrome 的渲染引擎合成了图像层。
- Image Decode	  
  一个图像资源被解码。
- Image Resize  
  一个图像的大小相对于其原生尺寸发生了变化。
- Paint  
  合成的图层被绘制到显示画面的一个区域。将鼠标悬停到 Paint 记录上会突出显示已被更新的显示画面区域。

事件属性：
- Location	  
  对于 Paint 事件，绘制矩形的 x 和 y 坐标。
- Dimensions	  
  对于 Paint 事件，已绘制区域的高度和宽度。