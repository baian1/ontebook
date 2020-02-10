# splitchunk

webpack 中用于代码分割的配置项

属性:

1. chunks: all, async, and initial 表示拆分模块的导入类型
2. minSize: 最小模块拆分,比如最小需要 30kb 才能拆分
3. maxSize: 最大拆分块,
4. minRemainingSize: 拆封出来的最小块需要满足大小,基本不用配置,默认等于 minSize
5. minChunks: 需要拆分出来的模块,需要被至少几个地方引用
6. maxAsyncRequests: 同时按需加载最大模块数,
7. maxInitialRequests: 入口页面同时加载模块数
8. automaticNameDelimiter: 名字间的连接符号
9. automaticNameMaxLength: 最大名字长度

## cacheGroup

继承外面的配置  
额外可以配置的属性:

1. test 控制此缓存组选择的模块。省略它会选择所有模块。它可以匹配绝对模块资源路径或块名称。匹配块名称时，将选择块中的所有模块。
2. priority 一个模块可以属于多个缓存组。优化将首选具有较高的缓存组 priority。
3. reuseExistingChunk 如果当前块包含已从主捆绑包中拆分出的模块，则将重用该模块，而不是生成新的模块。这可能会影响块的结果文件名。
