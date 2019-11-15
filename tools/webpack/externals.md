# externals

排除文件中引用的东西,不打包进来

技巧：

1. 排除文件,使用 CDN 的全局变量代替
   打包文件,jquery 会被全局变量 jQuery 代替,`import $ from "jquery"`会被改变

   ```javascript
   import $ from "jquery";

   $(".my-element").animate(/* ... */);
   ```

   ```javascript
   module.exports = {
     //...
     externals: {
       jquery: "jQuery"
     }
   };
   ```

   可以使用对象,不同的对象表示不同的引入方式,上面的字符串就是 root 模式

   - root: The library should be available as a global variable (e.g. via a script tag).
   - commonjs: The library should be available as a CommonJS module.
   - commonjs2: Similar to the above but where the export is module.exports.default.
   - amd: Similar to commonjs but using AMD module system.

2. array 写法

   ```javascript
   module.exports = {
     //...
     externals: {
       //表示subtract用./math中的subtract代替,require('./math').subtract
       subtract: ["./math", "subtract"]
     }
   };
   ```

   还可以用在 root 字段中，表示全局`window['math']['subtract']`

   ```javascript
   externals: {
     subtract: {
       root: ["math", "subtract"];
     }
   }
   ```

3. function 写法,定义自己的功能来控制要从 Webpack 外部化的行为的行为可能会很有用。例如，webpack-node-externals 将从 node_modules 目录中排除所有模块，并提供一些选项，例如白名单软件包。

   ```javascript
   module.exports = {
     //...
     externals: [
       function(context, request, callback) {
         if (/^yourregex$/.test(request)) {
           return callback(null, "commonjs " + request);
         }
         callback();
       }
     ]
   };
   ```

4. 正则,直接排除模块

```javascript
module.exports = {
  //...
  externals: /^(jquery|\$)$/i
};
```

## 组合使用

放在一个数组内

```javascript
module.exports = {
  //...
  externals: [
    {
      // String
      react: "react",
      // Object
      lodash: {
        commonjs: "lodash",
        amd: "lodash",
        root: "_" // indicates global variable
      },
      // Array
      subtract: ["./math", "subtract"]
    },
    // Function
    function(context, request, callback) {
      if (/^yourregex$/.test(request)) {
        return callback(null, "commonjs " + request);
      }
      callback();
    },
    // Regex
    /^(jquery|\$)$/i
  ]
};
```
