# npm 脚本

package.json 文件里面，使用 scripts 字段定义脚本命令。

```
{
  // ...
  "scripts": {
    "build": "node build.js"
  }
}
```

```
$ npm run build
# 等同于执行
$ node build.js
```

# 原理

npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令  
并且会将当前目录的 node_modules/.bin 子目录加入 PATH 变量，执行结束后，再将 PATH 变量恢复原样。

# 传递参数

使用--符号  
npm run test -- --grep="pattern" 可以将 --grep="pattern" 参数传给 test 命令

# 执行顺序

```
//并行执行
npm run script1.js & npm run script2.js
//继发执行
npm run script1.js && npm run script2.js
```

# hook

```
//默认钩子
prepublish，postpublish
preinstall，postinstall
preuninstall，postuninstall
preversion，postversion
pretest，posttest
prestop，poststop
prestart，poststart
prerestart，postrestart
```

```
//自定义钩子
//比如build的钩子
"prebuild": "echo I run before the build script",
"build": "cross-env NODE_ENV=production webpack",
"postbuild": "echo I run after the build script"
```

# 变量

package.json 中的对象会被添加到 process.env,并且在前面加上 npm_package\_前缀

- npm_lifecycle_event - 正在运行的脚本名称
- npm_package\_\<key> - 获取当前包 package.json 中某个字段的配置值：如 npm_package_name 获取包名
- npm_package\_\<key>\_\<sub-key> - package.json 中嵌套字段属性：如 npm_pacakge_dependencies_webpack 可以获取到 package.json 中的 dependencies.webpack 字段的值，即 webpack 的版本号

# npx

1. 从远程下载 npm 源的二进制包并执行
2. 执行 GitHub Gist

```
npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32
```
