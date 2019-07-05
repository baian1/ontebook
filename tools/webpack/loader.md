# loader
webpack只能识别js和JSON
通过loader加载其他类型文件,并转换为可供使用的模块  
模块加载从右到左
```
module: {
  rules: [
    { test: /\.txt$/, use: 'raw-loader' }
  ]
}
```