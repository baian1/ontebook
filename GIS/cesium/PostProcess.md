# PostProcess

## PostProcessStages

### fs 内变量分析

1. `uniform sampler2D colorTexture;` 颜色纹理是渲染场景或上一阶段的输出(需要那个场景输出的名字)
   `depthTexture`输入的深度纹理
2. `varying vec2 v_textureCoordinates;` 像素点位置信息

### 外部传入变量

```js
let uniforms = {
  highlight: function() {
    return new Cesium.Color(1.0, 0.0, 0.0, 0.5);
  },
  scale: 1.1,
  img: new Image()
};
```

### 导出的 texture

设置 name,可以被其它阶段的 PostProcessStage 引用

```js
new Cesium.PostProcessStage({
   name:'texture1'
  fragmentShader: fs,
  uniforms: {
    scale: 1.1,
    offset: function() {
      return new Cesium.Cartesian3(0.1, 0.2, 0.3);
    }
  }
});

//将其它阶段的导出作为输入纹理
new Cesium.PostProcessStage({
  uniforms: {
    texture1:'texture1'
  }
});
```

## PostProcessStageComposite

多个 PostProcessStage 的集合,按照顺序执行
