# 模块
```
const fs = require('fs');

(function(exports, require, module, __filename, __dirname) {
// Module code actually lives in here
});
```
- __filename 模块的 JavaScript 源文件的标准名称
- exports module.exports 的简短表示形式
- require 大家很熟悉的用于包含其他模块的函数
- module 对当前模块的引用
- __dirname 模块的 JavaScript 源文件所在目录的完整路径