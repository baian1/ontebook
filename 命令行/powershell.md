# 环境变量
每次创建一个窗口就会有一个env副本操作  
下一次打开就会消失
## 读取
- 按照名字读取  
```
$env:xxx
```
- 列出所有变量  
```
ls env:
```
## 创建
直接赋值创建
```
$env:TestVar1="This is my environment variable"
```
## 删除
```
del env:windir
```

## 环境变量更新生效
.NET方法[environment]::SetEnvironmentvariable操作可以立刻生效。
```
[environment]::SetEnvironmentvariable("Path", ";c:\powershellscript", "User")
```