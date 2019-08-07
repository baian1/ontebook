# prof
node.js的性能概要分析器

- --prof 启用概要分析
- --no-logfile-per-isolate 此参数可告知概要分析器在每次运行时都生成一个日志文件（称为 v8.log），并覆盖前一个日志文件。
- --log - 创建最少量的日志记录  
- --logfile=exampleX.log 在当前目录中创建名为 exampleX.log 的日志文件。
```
node --prof --no-logfile-per-isolate --log --logfile=example3.log example3
```


- --prof-process 可以将概要分析器信息进行格式化
```
node --prof-process example3.log > example3.log.txt
```