# source map

浏览器执行的js代码,往往由于各种原因使用babel等工具进行编译,将编译后的文件拿去执行.

常见的源码转换原因:

- 兼容性代码
- 代码体积等因素,
- 多个文件合并,减少http请求数
- 其他语言编译为js

bundle的文件通常只有一行,变量名简短,不可读,我们debugger的时候,需要通过源文件,才能更好地理解代码的执行逻辑.

所以就有了soure map,可以将编译完的文件映射到源文件.

## 格式解析

```json
{
  "version" : 3,                          // Source Map版本
  "file": "out.js",                       // 输出文件（可选）
  "sourceRoot": "",                       // 源文件根目录（可选）
  "sources": ["foo.js", "bar.js"],        // 源文件列表
  "sourcesContent": [null, null],         // 源内容列表（可选，和源文件列表顺序一致）
  "names": ["src", "maps", "are", "fun"], // mappings使用的符号名称列表
  "mappings": "A,AAAB;;ABCDE;"            // 带有编码映射数据的字符串
}
```

### VLQ编码

## 参考资料

1. [Source Map 原理及源码探索](https://zhuanlan.zhihu.com/p/104519418?utm_source=qq&utm_medium=social&utm_oi=703260335347347456)
2. [source-map](https://github.com/mozilla/source-map#consuming-a-source-map)
3. [node-source-map-support](https://github.com/evanw/node-source-map-support#readme)
