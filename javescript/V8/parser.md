# Parser:full,"eager"

- 想要编译的函数
- 构建 AST
- 构建 Scopes
- 找到语法错误

# PreParser:fast,"lazy"

- 跳过不想要编译的函数
- 不构建 AST
- 构建 Scopes,但是不放变量进去
- 解析更快

# lazy va eager

对于需要立即执行的函数使用 eager,通常这是一些表达式  
对于不需要立即执行的函数使用 lazy,如果 lazy 后需要执行,那么将会支付 1.5parse
