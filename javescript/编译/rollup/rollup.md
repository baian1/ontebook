# rollup

1. 通过入口文件路径读取代码
2. 利用acorn解析为ast树
3. 对ast节点进行分析,每一个AST节点生成一个Scope,names记录声明的变量或函数,
4. 判断使用的Identifier的位置,如果是外部引入的,就需要引入外部模块了.
5. 整理玩ast树后,解析外部模块,匹配Identifier,将其ast树分析,摘出来,tree-sharking
6. 然后判断全局变量名是否影响,去掉一些export等
7. 将所有文件输出成字符串合并在一起
