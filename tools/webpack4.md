# webpack4

## entry
文件入口,webpack顺着这个入口编译所有文件
entry: {[entryChunkName: string]: string|Array\<string>}
对象语法可以确定多个入口
note: 不要为不是入口的文件添加


## output
编译完的文件输出  
- path  
  表示输出路径
- filename  
  表示文件名
```
//对应单个入口
module.exports = {
  output: {
    filename: 'bundle.js',
  }
};
```
对于多个入口或者使用了CommonsChunkPlugin 这样的插件  
需要使用subsititution确保每个文件具有唯一名  
filename: '[name].js',  

占位符|描述
|---|---|
[hash]|模块标识符(module identifier)的 hash
[chunkhash]|chunk 内容的 hash
[name]|模块名称
[id]|模块标识符(module identifier)
[query]|模块的 query，例如，文件名 ? 后面的字符串
[function]|The function, which can return filename [string]

## loader
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

## plugin
提供打包优化，资源管理，注入环境变量等

## mode
development, production 或 none
```mode: 'production'```
启用webpack内置在相应环境下的优化

### mode: development
```
module.exports = {
+ mode: 'development'
- devtool: 'eval',
- cache: true,
- performance: {
-   hints: false
- },
- output: {
-   pathinfo: true
- },
- optimization: {
-   namedModules: true,
-   namedChunks: true,
-   nodeEnv: 'development',
-   flagIncludedChunks: false,
-   occurrenceOrder: false,
-   sideEffects: false,
-   usedExports: false,
-   concatenateModules: false,
-   splitChunks: {
-     hidePathInfo: false,
-     minSize: 10000,
-     maxAsyncRequests: Infinity,
-     maxInitialRequests: Infinity,
-   },
-   noEmitOnErrors: false,
-   checkWasmTypes: false,
-   minimize: false,
- },
- plugins: [
-   new webpack.NamedModulesPlugin(),
-   new webpack.NamedChunksPlugin(),
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
- ]
}
```
### mode: production
```
module.exports = {
+  mode: 'production',
- performance: {
-   hints: 'warning'
- },
- output: {
-   pathinfo: false
- },
- optimization: {
-   namedModules: false,
-   namedChunks: false,
-   nodeEnv: 'production',
-   flagIncludedChunks: true,
-   occurrenceOrder: true,
-   sideEffects: true,
-   usedExports: true,
-   concatenateModules: true,
-   splitChunks: {
-     hidePathInfo: true,
-     minSize: 30000,
-     maxAsyncRequests: 5,
-     maxInitialRequests: 3,
-   },
-   noEmitOnErrors: true,
-   checkWasmTypes: true,
-   minimize: true,
- },
- plugins: [
-   new TerserPlugin(/* ... */),
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
-   new webpack.optimize.ModuleConcatenationPlugin(),
-   new webpack.NoEmitOnErrorsPlugin()
- ]
}
```
### mode: none
```
module.exports = {
+ mode: 'none',
- performance: {
-  hints: false
- },
- optimization: {
-   flagIncludedChunks: false,
-   occurrenceOrder: false,
-   sideEffects: false,
-   usedExports: false,
-   concatenateModules: false,
-   splitChunks: {
-     hidePathInfo: false,
-     minSize: 10000,
-     maxAsyncRequests: Infinity,
-     maxInitialRequests: Infinity,
-   },
-   noEmitOnErrors: false,
-   checkWasmTypes: false,
-   minimize: false,
- },
- plugins: []
}
```

### resolve
- resolve.alias
  将import中的名字匹配并解析  
  $只会与匹配的名字才会更改替换

alias:	|import 'xyz'	|import 'xyz/file.js'
|------|--|--|
{}|/abc/node_modules/xyz/index.js|/abc/node_modules/xyz/file.js
{ xyz: '/abs/path/to/file.js' }|/abs/path/to/file.js|error
{ xyz$: '/abs/path/to/file.js' }|/abs/path/to/file.js|/abc/node_modules/xyz/file.js
{ xyz: './dir/file.js' }|/abc/dir/file.js|error
{ xyz$: './dir/file.js' }|/abc/dir/file.js|/abc/node_modules/xyz/file.js
{ xyz: '/some/dir' }|/some/dir/index.js|/some/dir/file.js
{ xyz$: '/some/dir' }|/some/dir/index.js|/abc/node_modules/xyz/file.js
{ xyz: './dir' }|/abc/dir/index.js|/abc/dir/file.js
{ xyz: 'modu' }|/abc/node_modules/modu/index.js|/abc/node_modules/modu/file.js
{ xyz$: 'modu' }|/abc/node_modules/modu/index.js|/abc/node_modules/xyz/file.js
{ xyz: 'modu/some/file.js' }|/abc/node_modules/modu/some/file.js|error
{ xyz: 'modu/dir' }|/abc/node_modules/modu/dir/index.js|/abc/node_modules/dir/file.js
{ xyz: 'xyz/dir' }|/abc/node_modules/xyz/dir/index.js|/abc/node_modules/xyz/dir/file.js
{ xyz$: 'xyz/dir' }|/abc/node_modules/xyz/dir/index.js|/abc/node_modules/xyz/file.js
```
resolve: {
  alias: {
    Utilities: path.resolve(__dirname, 'src/utilities/'),
    Templates: path.resolve(__dirname, 'src/templates/')
  }
}
```
- resolve.aliasField  
  可以不加载某些文件或者替换某些需要加载的文件而不需要一个个修改文件
- resolve.enforceExtension  
  扩展强制要求
- enforceModuleExtension  
  modules第三方模块扩展的扩展
- resolve.extensions
  使用指定扩展名尝试不带扩张名程序
```
module.exports = {
  //...
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json']
  }
};
```