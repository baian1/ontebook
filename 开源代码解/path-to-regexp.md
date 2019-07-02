# path-to-regexp
将一个地址解析成正则表达式，用于匹配是否符合route  
可选项：  
1. 用于解析地址到token
  - delimiter 分隔符,默认为'/'
  - whitelist 不在白名单分隔符号无法匹配,默认为undefind 会匹配任何分隔符
2. 用于生成reg
  - sensitive 表示flag的大小写
  - start与end 表示正则匹配开头与结尾
  - endsWith 表示结尾需要匹配的字符，通常与end一起使用
  - strict 表示是否在尾部添加的分隔符号匹配,默认添加
# 正则
```
//匹配\+任意字符,是res[1]的位置
/(\\.)|

// 在res中按顺序排列
// 前两位在有:xxx时匹配到
// 否则会走|匹配到第三个()
// 第四个特殊字符单独匹配
// ":test(\\d+)?" => ["test", "\d+", undefined, "?"]
// "(\\d+)"  => [undefined, undefined, "\d+", undefined]
(
  //第一部分
  //用来匹配\:asd(XXX)格式并保存asd和xxx
  ?:\:(\w+)

  //这里匹配一个括号
  //获取括号内的内容
  //获取\+任意字符 或 除\()外的任意字符 集合
  (
    ?:\(
    ((?:\\.|[^\\()])+)
    \)
  )?
  
  |

  //或者直接匹配(xxx)，获取括号内的xxx
  \(((?:\\.|[^\\()])+)\)
)
  //匹配末尾的三种单字符
  ([+*?])
  
  ?/g
```

# parse
将一个地址解析为token：
比如/home/phone/:id/:name  
解析为一个数组
```
[
  '/home/phone',
  {
    //分隔符
    delemiter:'/',
    //名字
    name:'id',

    optional:false,
    //用于正则中的匹配用
    pattern: "[^\/]+",
    //前缀
    prefix:'/'
    repeat:false
  }
]
```
具体流程
```
function parse (str, options) {
  //保存一系列参数
  //创建变量保存数据
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER
  var whitelist = (options && options.whitelist) || undefined
  var pathEscaped = false
  var res

  //匹配:xxx(xxx)或(xxx)
  while ((res = PATH_REGEXP.exec(str)) !== null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    //根据偏移取出/home/phone/这种字符串
    path += str.slice(index, offset)
    //重设index起点,跳到匹配的字符后一位开始
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      pathEscaped = true
      continue
    }

    var prev = ''
    var name = res[2]
    var capture = res[3]
    var group = res[4]
    var modifier = res[5]

    //处理并添加path到token
    if (!pathEscaped && path.length) {
      var k = path.length - 1
      var c = path[k]
      //白名单，判断是不是分隔符
      var matches = whitelist ? whitelist.indexOf(c) > -1 : true

      if (matches) {
        prev = c
        path = path.slice(0, k)
      }
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
      pathEscaped = false
    }

    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var pattern = capture || group
    var delimiter = prev || defaultDelimiter

    //将匹配到的:xxx(xxx)放入token中
    tokens.push({
      // token名，用于命名或number索引
      name: name || key++,
      // 前缀字符
      prefix: prev,
      // 分隔符(默认与前缀相同)
      delimiter: delimiter,
      // 表示token是不是可选的
      optional: optional,
      // 表示是不是可以重复的
      repeat: repeat,
      // 用于匹配该token的RegExp
      pattern: pattern
        ? escapeGroup(pattern)
        : '[^' + escapeString(delimiter === defaultDelimiter ? delimiter : (delimiter + defaultDelimiter)) + ']+?'
    })
  }

  // Push any remaining characters.
  // 结尾部分的path
  if (path || index < str.length) {
    tokens.push(path + str.substr(index))
  }

  return tokens
}
```

# escapeString
对有逻辑规则的符号添加转义\
```
str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
```