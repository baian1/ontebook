# shaking
当我们使用webpack和es6的模块导入语法的时候，webpack可以分辨出我们的依赖项，并只打包依赖内容

## sideEffects
副作用库声明
```
//直接在webpack中声明
module.rules: [
  {
    include: path.resolve("node_modules", "lodash"),
    sideEffects: false
  }
]

//在package.json
{
  "name": "webpack-tree-shaking-example",
  "version": "1.0.0",
  "sideEffects": false
}
```

# 代码拆分
- Vendor 拆分将公共代码（例如，React，lodash 等 ）从程序代码中分离出来。这允许您将应用程序和公共代码分开。这种隔离可以降低公共代码或应用程序代码更改时使用户的缓存失效的负面性能影响。这应该在每个应用程序中都实现。
- 入口拆分通过将您的代码按应用程序中的入口进行分隔，这些脚本是webpack和Parcel等工具在构建应用程序的依赖关系树时启动的脚本。这最适用于未使用客户端路由的页面或应用程序，或者某些部分使用服务器端路由而其他部分属于单页面应用程序的混合应用程序。
- 动态拆分将使用动态import()语句进行代码拆分。这种类型的拆分通常最适合单页面应用程序。

## 根据入口拆分
webpack可以根据多个入口生成多颗独立的树
```
entry: {
  main: path.join(__dirname, "src", "index.js"),
  detail: path.join(__dirname, "src", "detail.js"),
  favorites: path.join(__dirname, "src", "favorites.js")
},
```
Bundle Buddy或webpack-bundle-analyzer可以分析代码中的重复代码

使用optimization优化块
```
//将node_modules中的文件都提取到一个文件
optimization: {
  splitChunks: {
    cacheGroups: {
      // Split vendor code to its own chunk(s)
      vendors: {
        test: /[\\/]node_modules[\\/]/i,
        chunks: "all"
      }
    },
    //将块之间的相同代码拆分到一个commons的新块
    // Split code common to all chunks to its own chunk
    commons: {
      name: "commons",    // The name of the chunk containing all common code
      chunks: "initial",  // TODO: Document
      minChunks: 2        // This is the number of modules
    }
  },
  // The runtime should be in its own chunk
  runtimeChunk: {
      name: "runtime"
  }
},
```

## 动态拆分代码
使用webpacck可以自动拆分
```
//给块命名
import(/* webpackChunkName: "PedalDetail" */ "./components/PedalDetail/PedalDetail")
```

### 加载
1. 使用服务工作线程预缓存脚本
```
const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  // ...
  plugins: [
    // ... other plugins omitted
    new GenerateSW({
      //选择需要缓存的脚本,空的话为所有脚本
      chunks: ["main", "Favorites", "PedalDetail", "vendors"]
    })
  ]
  // ...
};
```

2. 预提取和预加载脚本
  - rel=prefetch是对以后要使用的非关键资源的低优先级提取。当浏览器空闲时，rel=prefetch会启动请求。
  ```
  //webpackPrefetch内联指令
  import(/* webpackPrefetch: true, webpackChunkName: "Favorites" */ "./components/Favorites/Favorites")
  ```
  - rel=preload是当前路由使用的关键资源的高优先级提取。 rel=preload启动的资源请求可能比浏览器发现它们时更早发生。但是，预加载是非常敏感的，因此您可能需要查看本指南 （以及可能的规范 ）以获得指导。 使用webpackPreload: true

  - 对于非动态加载的脚本,可以通过preload-webpack-plugin