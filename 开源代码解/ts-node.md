# ts-node
## 原理
创建一个文件写typescript相关函数，用来编译ts文件  
调用了服务将ts代码编译为js代码用node运行  
## 命令行代码运行

```
/**
 * Evaluate the code snippet.
 */
function _eval (input: string) {
  const lines = EVAL_INSTANCE.lines       
  const isCompletion = !/\n$/.test(input) 
  const undo = appendEval(input)          //将输入转为可执行函数
  let output: string

  try {
    output = service.compile(EVAL_INSTANCE.input, EVAL_PATH, -lines)//编译文件，EVAL_INSTANCE.input是所有输入字符串
  } catch (err) {
    undo()
    throw err
  }

  // Use `diff` to check for new JavaScript to execute.
  const changes = diffLines(EVAL_INSTANCE.output, output)

  if (isCompletion) {
    undo()
  } else {
    EVAL_INSTANCE.output = output//改变全局输出
  }

  return changes.reduce((result, change) => {
    return change.added ? exec(change.value, EVAL_FILENAME) : result
  }, undefined)//执行多出来的那一行返回结果
}

/**
 * Execute some code.
 */
function exec (code: string, filename: string) {
  const script = new Script(code, { filename: filename })

  return script.runInThisContext()
}
```