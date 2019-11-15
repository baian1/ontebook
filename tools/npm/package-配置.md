# files

用来配置包被安装的时候会包括的文件

# 入口

用来配置直接导入包的时候是从哪个文件导出的

main require 引用的时候用到
module 表示 ESM 模块引用的时候选择的方式

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

假设保 PackageA 依赖于包 PackageB

1.  直接在 Dependencies 中依赖,会有如下目录结构

```
|- node_modules
  |- PackageA
    |- node_modules
      |- PackageB
```

这样我们不能直接使用 packageB,并且再根 node_modules 下还可以安装一个其他版本的 PackageB

2. 在 peerDependencies 声明依赖,会安装到根 node_modules 目录下

```
|- node_modules
  |- PackageA
  |- PackageB
```

## 适用情况

1. 包的插件,插件是对指定平台版本发布,不兼容升级版本,并且插件不依赖平台(不适合写在 Dependencies),就可以在 peerDependencies 声明宿主环境

# engines

这个包需要的运行环境版本

```
{ "engines" : { "node" : ">=0.10.3 <0.12" } }
{ "engines" : { "npm" : "~1.0.20" } }
```
