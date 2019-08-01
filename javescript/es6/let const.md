# Temporal Dead Zone (TDZ)
使用let和const时,当我们进入范围时将创建变量,同时会创建一个TDZ,
在代码执行到达实际声明的变量位置之前将无法范文,访问会导致ReferenceError: there is not defined