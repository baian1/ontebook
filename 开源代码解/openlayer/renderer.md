# renderer

用于遍历layers进行渲染,主要负责调度任务

## Composite

Composite类继承与Map类,负责调用layer的render

1. Map类具有投影
   - calculateMatrices2D 计算像素与实际投影坐标转换矩阵
   - forEachFeatureAtCoordinate 调用layer的render获取feature

2. Composite类对Map进行扩展
   - element_ 容器用于放置渲染后的canvas
   - renderFrame 调度所有layer的渲染器进行渲染,layer的renderer需要需要根据传进来的framestate对canvas进行绘制,第二个参数会作为渲染时用于获取canvas 2d上下文,canvas绘制完成后,如果canvas变化了,还需要切换元素  

## LayerRenderer

LayerRenderer 类,给Composite类调用的抽象类,用于调用layer的参数渲染绘制

- layer 绑定的layer
- declutterExecutorGroup
- prepareFrame 比如在vectorLayer中,改阶段会创建replayGroup(BuilderGroup),然后传递需要渲染的数据,构建渲染命令,再把replayGroup作为参数创建ExecutorGroup

## vector

对于一些几何体,需要在渲染前转换成绘制命令,然后在渲染阶段进行绘制

```js
const GEOMETRY_RENDERERS = {
  'Point': renderPointGeometry,
  'LineString': renderLineStringGeometry,
  'Polygon': renderPolygonGeometry,
  'MultiPoint': renderMultiPointGeometry,
  'MultiLineString': renderMultiLineStringGeometry,
  'MultiPolygon': renderMultiPolygonGeometry,
  'GeometryCollection': renderGeometryCollectionGeometry,
  'Circle': renderCircleGeometry,
};
```
