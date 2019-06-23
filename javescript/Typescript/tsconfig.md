# 通配符
- *匹配零个或多个字符（不包括目录）
- ?匹配任意一个字符（不包括目录）
- **/递归匹配所有子目录
如果文件通配符模式语句中只包含*或.*，那么只匹配带有扩展名的文件（例如默认是.ts、.tsx和.d.ts，如果allowJs设置为true，.js和.jsx也属于默认）。

如果"files"和"include"都没有指定，编译器默认包含所有目录中的TypeScript文件（.ts、.d.ts和.tsx），除了那些使用exclude属性排除的文件外。如果allowJs设置为true，JS文件（.js和.jsx）也会被包含进去。
# 配置继承
使用extends来继承配置
- extends在tsconfig.json是新的顶级属性（与compilerOptions、files、include和exclude一起）。
- extends的值是包含继承自其它tsconfig.json路径的字符串。
- 首先加载基本文件中的配置，然后由继承配置文件重写。
- 如果遇到循环，我们报告错误。
- 继承配置文件中的files、include和exclude会重写基本配置文件中相应的值。
- 在配置文件中找到的所有相对路径将相对于它们来源的配置文件来解析。

# pretty
如果输出设备能使用彩色文本,使用pretty将会报错  
--pretty false取消输出彩色文字

# declarationMap
输出.d.ts.map文件,可以映射到ts文件