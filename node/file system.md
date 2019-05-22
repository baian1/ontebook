# file system

## fs.readdir(path[, options], callback)
- path \<string> | <Buffer> | <URL>
- options \<string> | <Object>
  - encoding \<string> Default: 'utf8'
  - withFileTypes \<boolean> Default: false
- callback <Function>
  - err <Error>
  - files \<string[]> | <Buffer[]> | \<fs.Dirent[]>
返回数组,包含所有文件名和文件夹名字

## fs.stat(path[, options], callback)
判断文件是目录还是文件

## fs.appendFile(path, data[, options], callback)
- path \<string> | \<Buffer> | \<URL> | \<number> filename or file descriptor
- data \<string> | \<Buffer>
- options \<Object> | \<string>
  - encoding \<string> | \<null> Default: 'utf8'
  - mode \<integer> Default: 0o666
  - flag \<string> See support of file system flags. Default: 'a'.
- callback \<Function>
  - err \<Error>  

在文件后面加字符

## fs.writeFile

## fs.mkdir(path[, options], callback) 创建目录
- path \<string> | \<Buffer> | \<URL>
- options \<Object> | \<integer>
  - recursive \<boolean> Default: false
  - mode \<integer> Not supported on Windows. Default: 0o777.
- callback \<Function>
  - err \<Error>

recursive为true时,可以在相关目录没有的时候创建
```
// Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
fs.mkdir('/tmp/a/apple', { recursive: true }, (err) => {
  if (err) throw err;
});
```

## fs.rename(oldPath, newPath, callback) 重命名 
## fs.rmdir(path, callback)  删除目录 
## fs.unlink(path, callback)
