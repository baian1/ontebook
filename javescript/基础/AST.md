# 抽象语法树

基本上的实现遵循 mdn 的表中

# lint

通过解析代码生成 ast 树,我们可以通过遍历树,找到对应节点应用 lint 规则,判断代码是否有错误

# 代码执行

v9 需要将 js 代码编译成 AST,然后再生成 bytecode

# vue

vue 使用的模板将会被解析为 ast,然后 optimize 标记是不是静态节点,最后通过 generate 生成 vue 的字符串,通过 compileToFunction 转换为函数,最后生成 Vdom  
双向数据绑定 通过修改数据,以其 Vdom 节点为根节点,进行 render
