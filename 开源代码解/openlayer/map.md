# Map

一个总控制,负责管理,调度渲染.

## 结构

1. view 视口
    - 视口实际范围 extent
    - 中心点 center
    - 分辨率 resolution
    - 旋转角度 rotation
    - 视口像素 viewportSize
2. 控制部分
   - controls
   - interactions
3. 页面渲染的元素部分
   - layergroup

## 属性值

渲染部分:

- coordinateToPixelTransform 和 pixelToCoordinateTransform 二维的坐标转换,每次render时,都会重新计算
- frameIndex 渲染次数,每次渲染+1
- viewport 视口元素
- overlayContainer
- overlayContainerStopEvent
- renderer 渲染器,常用CompositeMapRenderer

----------------

事件部分:

将对应的回调函数进行注册

- handleBrowserEvent 原生浏览器事件的包装,与 interaction 配合使用
- mapBrowserEventHandler ol的事件
- moveTolerance 调用事件时,鼠标拖拽在一定范围(小于moveTolerance)内,判断为点击
- keyboardEventTarget 键盘事件触发目标
- controls和interactions 事件交互的输入

## 初始化

1. 创建结构
2. 注册各类属性变化的回调函数(重新渲染)
3. 设置好后,渲染依靠renderFrame_
