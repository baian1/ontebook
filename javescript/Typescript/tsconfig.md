# 通配符

- \*匹配零个或多个字符（不包括目录）
- ?匹配任意一个字符（不包括目录）
- \**/递归匹配所有子目录
  如果文件通配符模式语句中只包含*或.\*，那么只匹配带有扩展名的文件（例如默认是.ts、.tsx 和.d.ts，如果 allowJs 设置为 true，.js 和.jsx 也属于默认）。

如果"files"和"include"都没有指定，编译器默认包含所有目录中的 TypeScript 文件（.ts、.d.ts 和.tsx），除了那些使用 exclude 属性排除的文件外。如果 allowJs 设置为 true，JS 文件（.js 和.jsx）也会被包含进去。

## 文件列表

- files  
  是文件的绝对路径,文件一定会编译
- "include" | "exclude"  
  类似于使用 patterns 来匹配文件,include 中包含的文件可以被 exclude 过滤

在"files"和"include"两者都未指定，则编译器默认为包括在含有目录和子目录的打字稿（.ts，.d.ts 和.tsx）文件，除了那些使用排除"exclude"属性。

# types 文件

默认情况,所有@types 文件都会被包含,比如./node_modules/@types/， ../node_modules/@types/，../../node_modules/@types/等

- "typeRoots"  
  指定类型所在文件
- "types"  
  指定文件内,被导入的类型包

# 配置继承

使用 extends 来继承配置

- extends 在 tsconfig.json 是新的顶级属性（与 compilerOptions、files、include 和 exclude 一起）。
- extends 的值是包含继承自其它 tsconfig.json 路径的字符串。
- 首先加载基本文件中的配置，然后由继承配置文件重写。
- 如果遇到循环，我们报告错误。
- 继承配置文件中的 files、include 和 exclude 会重写基本配置文件中相应的值。
- 在配置文件中找到的所有相对路径将相对于它们来源的配置文件来解析。

# pretty

如果输出设备能使用彩色文本,使用 pretty 将会报错  
--pretty false 取消输出彩色文字

# declarationMap

输出.d.ts.map 文件,可以映射到 ts 文件

# strictBindCallApply

开启后可以使 bind call apply 都变成严格类型

# extends

"extends": "@my-team/tsconfig-base"可以进入 node_modules 解析
