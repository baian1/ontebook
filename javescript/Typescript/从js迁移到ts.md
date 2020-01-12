# 迁移

## 单纯的 js 类型检测

开启 allowJs 和 checkJs,并设置 noEmit 为 true

## 需要编译 js

这里要设置 outDir,不然会让 js 文件编译后在原位置写入,造成
`Cannot write file 'C:/Users/1/Desktop/js-ts/src/index.js' because it would overwrite input file.`

## import js

当我们从 ts 文件中导入 js 文件时,

1. 如果没有.d.ts 文件,被默认为 ts 文件编译到原位置,造成与上面一个相同的结果可以设置,可以通过设置 outDir 解决
2. 设置 d.ts 后能判断是 js 文件,不在原位置编译
