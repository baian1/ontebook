# hook

- async: The hook may also return a promise resolving to the same type of value; otherwise, the hook is marked as sync.
- first: If several plugins implement this hook, the hooks are run sequentially until a hook returns a value other than null or undefined.
- sequential: If several plugins implement this hook, all of them will be run in the specified plugin order. If a hook is async, subsequent hooks of this kind will wait until the current hook is resolved.
- parallel: If several plugins implement this hook, all of them will be run in the specified plugin order. If a hook is async, subsequent hooks of this kind will be run in parallel and not wait for the current hook.

## build hook

1. options 读取输入的options并可以对其进行改变
2. buildStart 经过所有插件对options的改变后,获取options结果
3. resolveDynamicImport与resolveId
   - moduleSideEffects
        1. false `import './a.js'` 即使a.js有副作用代码,也不会被包含在内,`import a from './a.js'`这类,如果a被使用了,会对文件进行副作用分析,包含有 副作用的代码 和 导出变量a相关的代码

        2. true 对导入模块分析,导入所有副作用代码
        3. no-treeshake 导入模块内的全部代码
   - syntheticNamedExports 导出一个对象内字段
   - meta 头信息
   - id 表示路径,如果external为true就用id代替导入的路径,否则传递给load加载模块
   - external 额外的代码,为true后跳到buildEnd
4. load 从resolveDynamicImport或resolveId返回了路径,在该阶段根据路径获取文件字符串,可以根据路径自定义构造js.
5. transform 对load阶段获取的js代码进行转换
6. moduleParsed 解析transform转换后的js,如果发现需要导入的模块,触发2,如果没有导入模块了走下一步
7. buildEnd 找到所有模块完成bunding后调用

## Output Generation Hooks

1. outputOption
2. renderStart 用于访问options
   并行步骤,给生成的chunk添加代码:
   - banner 文件头部注释
   - footer 文件尾部注释
   - intro 头部代码行
   - outro 尾部代码行
3. renderDynamicImport 转换import函数

   ```js
   // plugin
   const plugin = {
     name: 'dynamic-import-polyfill',
     renderDynamicImport() {
       return {
         left: 'dynamicImportPolyfill(',
         right: ', import.meta.url)'
       }
     }
   };

   // input
   import('./lib.js');

   // output
   dynamicImportPolyfill('./lib.js', import.meta.url);
   ```

4. augmentChunkHash 通过生成hash,判断文件是否需要更新,返回字符串来表示
5. resolveFileUrl与resolveImportMeta 替换import.meta
   - resolveFileUrl rollup定义的文件表示为 `import.meta.ROLLUP_FILE_URL_${referenceId};`,可以配合this.emitFile使用
   - resolveImportMeta 替换普通的属性
6. renderChunk 可以对最后生成的chunk进行改变
7. generateBundle 该阶段确定需要输出的文件,删除bundle参数中的key可以阻止文件被生成,调用this.emitFile可以添加文件.
8. writeBundle 输出文件后,该hook可以知道我们输出了哪些文件
