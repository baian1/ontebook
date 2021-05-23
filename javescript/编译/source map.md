# source map

浏览器执行的 js 代码,往往由于各种原因使用 babel 等工具进行编译,将编译后的文件拿去执行.

常见的源码转换原因:

- 兼容性代码
- 代码体积等因素,
- 多个文件合并,减少 http 请求数
- 其他语言编译为 js

bundle 的文件通常只有一行,变量名简短,不可读,我们 debugger 的时候,需要通过源文件,才能更好地理解代码的执行逻辑.

所以就有了 soure map,可以将编译完的文件映射到源文件.

## 格式解析

```json
{
  "version": 3, // Source Map版本
  "file": "out.js", // 输出文件（可选）
  "sourceRoot": "", // 源文件根目录（可选）
  "sources": ["foo.js", "bar.js"], // 源文件列表
  "sourcesContent": [null, null], // 源内容列表（可选，和源文件列表顺序一致）
  "names": ["src", "maps", "are", "fun"], // mappings使用的符号名称列表
  "mappings": "A,AAAB;;ABCDE;" // 带有编码映射数据的字符串
}
```

### 位置映射

输入(a.js) feel the force
输出(b.js) the force feel

a.js 提取出字符,

- feel
- the
- force,
  进行映射

| 字符  | 输出位置 | 输入位置 | 映射                       |
| ----- | -------- | -------- | -------------------------- |
| feel  | (0,10)   | (0,0)    | 0\|10\|a.js\|0\|0\|0(feel) |
| the   | (0,0)    | (0,5)    | 0\|0\|a.js\|0\|5\|1(feel)  |
| force | (0,4)    | (0,9)    | 0\|4\|a.js\|0\|9\|2(force) |

1. 通常输出的 bundle 是一行的,所以可以舍去输出的行信息
2. 为了避免出现特比大的数字,我们采用了相对位置,每个位置都是相对于上一个数据的,有效减小了最大数据

| 字符  | 输出位置 | 输入位置 | 映射                        |
| ----- | -------- | -------- | --------------------------- |
| feel  | (0,10)   | (0,0)    | 10\|0(a.js)\|0\|0\|0(feel)  |
| the   | (0,-10)  | (0,5)    | -10\|0(a.js)\|0\|5\|1(feel) |
| force | (0,4)    | (0,4)    | 4\|0(a.js)\|0\|4\|2(force)  |

### VLQ 编码

variable-length quantity (VLQ) 通过 任意数量的二进制八位位组（八位字节）表示任意大的整数

source map 中的映射关系,恰好是多位数字,通过 VLQ 表示一个个数字,天然替代了|符号,节省了空间

source map 使用了变种 VLQ,不采用 base-128 而是 base64,首位表示连续标识,最高有效位的末尾表示正负号,其余部分,末尾表示数据

## webpack source map

1. module 代码被 eval 包裹，最后行添加 source url
2. source map 整个文件添加 source url，并生成 source map
3. hidden-source-map 与 2 比，少了注释，但 map 文件存在
4. inline-source-map map 信息直接通过 url data 关联，没有额外文件
5. eval-source-map 与 1 类似，sourceMap url 都转为了 DataURL
6. cheap-source-map 没有列的单词对应关系，变为行信息对应
7. cheap-module-source-map 1+6

---

- 开发环境推荐：
  cheap-module-eval-source-map
- 生产环境推荐：
  cheap-module-source-map （这也是下版本 webpack 使用-d 命令启动 debug 模式时的默认选项）

原因如下：

1. 使用 cheap 模式可以大幅提高 souremap 生成的效率。大部分情况我们调试并不关心列信息，而且就算 sourcemap 没有列，有些浏览器引擎（例如 v8） 也会给出列信息。
2. 使用 eval 方式可大幅提高持续构建效率。参考官方文档提供的速度对比表格可以看到 eval 模式的编译速度很快。
3. 使用 module 可支持 babel 这种预编译工具（在 webpack 里做为 loader 使用）。
4. 使用 eval-source-map 模式可以减少网络请求。这种模式开启 DataUrl 本身包含完整 sourcemap 信息，并不需要像 sourceURL 那样，浏览器需要发送一个完整请求去获取 sourcemap 文件，这会略微提高点效率。而生产环境中则不宜用 eval，这样会让文件变得极大。

## 参考资料

1. [Source Map 原理及源码探索](https://zhuanlan.zhihu.com/p/104519418?utm_source=qq&utm_medium=social&utm_oi=703260335347347456)
2. [source-map](https://github.com/mozilla/source-map#consuming-a-source-map)
3. [node-source-map-support](https://github.com/evanw/node-source-map-support#readme)
4. [Source Map Revision 3 Proposal](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#)
5. [source map 原理分析](http://www.qiutianaimeili.com/html/page/2019/05/89jrubx1soc.html)
