# js 构建工具

## webpack

## rollup

支持 esmodules 的构建工具,可以进行 js 文件的打包.

### 配置文件

```js
//可以导出数组,将会打包出多个文件
//相当于多次调用rollup输入配置
export default [
  {
    input: "main-a.js",
    output: {
      file: "dist/bundle-a.js",
      format: "cjs",
    },
  },
  {
    //多个入口文件,如果有相同引用,将会被提取
    input: ["main-b.js", "main-b1.js"],
    //经过不同转换打包出文件
    //适用与输出多种格式的文件
    output: [
      {
        file: "dist/bundle-b1.js",
        format: "cjs",
      },
      {
        file: "dist/bundle-b2.js",
        format: "es",
      },
    ],
  },
];
```

也支持异步加载地配置文件

```js
export default Promise.all([fetch("get-config-1"), fetch("get-config-2")]);
```

---

支持从命令行输入 option 到配置项

```sh
rollup --config --configDebug
```

```js
import defaultConfig from "./rollup.default.config.js";
import debugConfig from "./rollup.debug.config.js";

//将会获取到配置项
export default (commandLineArgs) => {
  if (commandLineArgs.configDebug === true) {
    return debugConfig;
  }
  return defaultConfig;
};
```

---

将配置文件安装到 node_modules
`rollup --config node:my-special-config`

1. load the package "rollup-config-my-special-config";
2. if that fails, it will then try to load "my-special-config"

## gulp

gulp is a toolkit that helps you automate painful or time-consuming tasks in your development workflow.

### gulpfile.js

在文件中导出任务

```sh
# 执行default导出的任务
gulp

# 执行导出的xx任务
gulp xx
```

### 任务执行

1. 串行 series
2. 并行 parallel

### 异步任务

gulp 中的任务可以是异步的,支持返回 streams, promises, event emitters, child processes, or observables.

如果函数没有返回,可以调用

```js
function callbackError(cb) {
  // `cb()` should be called by some async work
  cb(new Error("kaboom"));
}

exports.default = callbackError;
```

### working with file

1. src 可以匹配文件,
2. pipe 导入数据流到其它函数中进行处理(转换文件)
3. dest 将流导出为文件

```js
const { src, dest } = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

exports.default = function () {
  return src("src/*.js") //获取js文件
    .pipe(babel()) //babel转换
    .pipe(src("vendor/*.js")) //添加加入js文件
    .pipe(dest("output/")) //文件导出到output文件(上面的两次导入的文件)
    .pipe(uglify()) //压缩文件
    .pipe(rename({ extname: ".min.js" })) //后缀名重命名
    .pipe(dest("output/")); //导出到output文件
};
```

### Plugins

插件可以对流进行操作

如果不是用插件,也可以用其它 jsAPI 进行操作,比如

```js
const { rollup } = require("rollup");

// Rollup's promise API works great in an `async` task
exports.default = async function () {
  const bundle = await rollup({
    input: "src/index.js",
  });

  return bundle.write({
    file: "output/bundle.js",
    format: "iife",
  });
};
```

通常情况下,插件用于转换文件,而其他操作直接调用 Node module 或 library 执行

### 监听文件

1. 使用自带的 watch
2. 使用 Chokidar

## snowpack
