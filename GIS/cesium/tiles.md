# tiles

模型加载

```js
var tileset = new Cesium.Cesium3DTileset({
  url: "../../SampleData/Cesium3DTiles/Tilesets/Tileset/tileset.json"
});

tileset.readyPromise
  .then(function(tileset) {
    viewer.scene.primitives.add(tileset);
    viewer.zoomTo(
      tileset,
      new Cesium.HeadingPitchRange(
        0.0,
        -0.5,
        tileset.boundingSphere.radius * 2.0
      )
    );
  })
  .otherwise(function(error) {
    console.log(error);
  });
```

## 旋转拉伸

通过 modelMatrix 属性,进行矩阵运算,来控制模型的方向,拉伸

## pick

3Dtiles 模型的每个 feature 都是可以被选中的,通过 scene.pick 获取

## 颜色与类名

加载 3D Tiles 后,feature.getExactClassName()来获取一个 ClassName

通过`tileset.style = new Cesium.Cesium3DTileStyle(style);`来进行样式设置,可以是 feature 的属性来判断,设置相应颜色

## 属性

通过 feature.getPropertyNames()获取模型的属性

## 支持格式

glb glft
b3dm i3dm
cmpt
pnts

## 相关资料

[3d-tiles](https://github.com/AnalyticalGraphicsInc/3d-tiles/)
