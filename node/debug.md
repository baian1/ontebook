# debug
这是一个node.js开源的调试库

# 创建命名空间
这个名字用来表示其属于哪里
```
a = require('debug')('worker:a')
```

# Millisecond diff
用来表示和上次debug事件差

# 区分文件
来自同一个库的文件可以通过添加:来区分 
connect:bodyParser  

# 通配符
可以通过\*来进行匹配  
通过-来排除匹配  
DEBUG=*,-connect:*将会排除connect相关的

# 环境变量
会在运行时读取,根据变量值进行相应操作  
名|目的
--|--
DEBUG|启用/禁用特定的调试命名空间。
DEBUG_HIDE_DATE|从调试输出中隐藏日期（非TTY）。
DEBUG_COLORS|是否在调试输出中使用颜色。
DEBUG_DEPTH|物体检查深度。
DEBUG_SHOW_HIDDEN|显示已检查对象的隐藏属性。

# 对输出格式化
格式化|表示
--|--
%O	|在多行上打印一个对象。
%o	|在一行上完美打印一个对象。
%s	|串。
%d	|数字（整数和浮点数）。
%j	|JSON。如果参数包含循环引用，则替换为字符串'[Circular]'。
%%	|单个百分号（'%'）。这不会消耗参数。

自定义输出
```
const createDebug = require('debug')
createDebug.formatters.h = (v) => {
  return v.toString('hex')
}

// …elsewhere
const debug = createDebug('foo')
debug('this is hex: %h', new Buffer('hello world'))
//   foo this is hex: 68656c6c6f20776f726c6421 +0ms
```

# 改变默认输出
默认输出方式
```
exports.log = log;
function log(...args) {
	return process.stderr.write(util.format(...args) + '\n');
}
```
改变
```
var debug = require('debug');
var log = debug('app:log');
log.log = console.log.bind(console);
```

# 简单添加扩展名字
```
const log = require('debug')('auth');

//creates new debug instance with extended namespace
const logSign = log.extend('sign');
const logLogin = log.extend('login');

log('hello'); // auth hello
logSign('hello'); //auth:sign hello
logLogin('hello'); //auth:login hello
```

# 控制输出
```
let debug = require('debug');
```
- 开启输出  
```
debug.enable(namespaces)
```
- 关闭所有输出  
```
debug.disable()
```