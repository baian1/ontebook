# files

用来配置包被安装的时候会包括的文件

# main

用来配置直接导入包的时候是从哪个文件导出的

# browser

相对于 main 是 node.js 用的  
browser 就是浏览器用的模块

# bin

脚本命令

```
{ "bin" : { "myapp" : "./cli.js" } }
//简化,在package.json里的name字段名为myapp时等价
{ "bin" : "./cli.js" }
```

# repository

```
"repository": {
  "type" : "git",
  "url" : "https://github.com/npm/cli.git"
}
```

# scripts

npm 运行的脚本

# config

npm 运行脚本的时候可以获取到的设置

# peerDependencies

包需要的兼容版本

# engines

这个包需要的运行环境版本

```
{ "engines" : { "node" : ">=0.10.3 <0.12" } }
{ "engines" : { "npm" : "~1.0.20" } }
```
