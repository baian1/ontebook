# render

涉及对canvas的一些操作,主要与vector有关

## Builder

prerender阶段进行,构造绘制命令,传递给render阶段

1. VectorContext 类 定义了绘制各类几何体的抽象接口
   - drawGeometry
   - drawCircle
   - drawFeature
   ...

2. CanvasBuilder类 canvas下实现的几何体绘制命令
   - CanvasImageBuilder
   - CanvasLineStringBuilder
   - CanvasPolygonBuilder
   - CanvasTextBuilder

3. BuilderGroup类 是对CanvasBuilder的管理,对外提供各类Builder

   ```js
   const BATCH_CONSTRUCTORS = {
     'Circle': PolygonBuilder,
     'Default': Builder,
     'Image': ImageBuilder,
     'LineString': LineStringBuilder,
     'Polygon': PolygonBuilder,
     'Text': TextBuilder,
   };
   ```

## Excutor

执行builder构建的命令

1. Excutor
   - execute 会遍历 ,对context2d进行绘制操作,使用的命令是builder中创建的
   - executeHitDetection 执行这个函数时CanvasInstruction.END_GEOMETRY阶段会featureCallback函数判断是否选中元素,如果选中元素在featureCallback执行中调用callback回调传递出去,featureCallback返回true中止继续绘制
2. ExcutorGroup
   - renderBuffer 绘制的视口范围参数
   - executorsByZIndex 对应z所使用的Executors,与BuilderGroup的指令相关
   - forEachFeatureAtCoordinate 调用每个excutor的executeHitDetection
   - execute 调用每个excutor的execute
