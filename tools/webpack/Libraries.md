# Libraries

使用 webpack 打包一个库

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    //path和filename,生成的路径和文件
    path: path.resolve(__dirname, "dist"),
    filename: "webpack-numbers.js",
    //包名,引用的时候使用的
    library: "webpackNumbers",
    //引用方式
    libraryTarget: "umd"
  },
  //将引用的包,peerdepen排除出去
  //选项表示不同的引用方式
  externals: [
    {
      lodash: {
        commonjs: "lodash",
        commonjs2: "lodash",
        amd: "lodash",
        root: "_"
      }
    },
    //还可以使用正则来匹配
    /^library\/.+$/
  ]
};
```

最后在 package.json 中设置入口

```JSON
{
  "main": "dist/webpack-numbers.js",
  //或者
  "module": "src/index.js",
}
```
