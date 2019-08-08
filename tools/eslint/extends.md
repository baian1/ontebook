# extends

我们的配置文件偶尔需要扩展  
可以使用 extends 加载

- 指定配置的字符串（配置文件的路径，可共享配置的名称 eslint:recommended，或 eslint:all）
- 字符串数组：每个附加配置都扩展了前面的配置

```
"extends": [
  "eslint:recommended",
  //插件中的配置
  'plugin:@typescript-eslint/recommended',
  "plugin:react/recommended",
  "plugin:prettier/recommended"
],
```
