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

对于多个入口或者使用了 CommonsChunkPlugin 这样的插件  
需要使用 subsititution 确保每个文件具有唯一名  
filename: '[name].js',

| 占位符        | 描述                                                     |
| ------------- | -------------------------------------------------------- |
| [hash]        | 每次构建生成 hash,所有文件都一样,一旦改变就全都变        |
| [chunkhash]   | chunk 内容的 hash,一旦文件改变，与此文件相关文件都会改变 |
| [contenthash] | 只有文件自己改变后,hash 才会变                           |
| [name]        | 模块名称                                                 |
| [id]          | 模块标识符(module identifier)                            |
| [query]       | 模块的 query，例如，文件名 ? 后面的字符串                |
| [function]    | The function, which can return filename [string]         |

# output.publicPath

此选项指定在浏览器中引用时输出目录的公共 URL。
