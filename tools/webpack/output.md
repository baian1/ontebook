# output
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