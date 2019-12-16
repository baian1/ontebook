# openlayer

开源的地图引擎库

## Basic Concepts

1. Map 将地图附加到一个节点上面,在初始化的时候配置,之后使用 setTarget 进行配置
2. View 控制地图中心,地图缩放大小和投影
3. Source 一个数据的集合,可以是免费的地图服务商提供的地图信息
4. Layer 用于将数据变成图像信息
   - ol/layer/Tile -渲染源，这些源在按缩放级别针对特定分辨率组织的网格中提供平铺图像。
   - ol/layer/Image -渲染源，以任意范围和分辨率提供地图图像。
   - ol/layer/Vector -在客户端渲染矢量数据。
   - ol/layer/VectorTile -渲染作为矢量切片提供的数据。

## 交互

interact 文件下有很多功能
