# path

## path.basename(path[, ext])
返回路径的最后一部分path  
ext表示匹配扩展名并移除

## path.delimiter
路径分割符号
```
console.log(process.env.PATH);
// Prints: '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'

process.env.PATH.split(path.delimiter);
// Returns: ['/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin']
```
```
console.log(process.env.PATH);
// Prints: 'C:\Windows\system32;C:\Windows;C:\Program Files\node\'

process.env.PATH.split(path.delimiter);
// Returns ['C:\\Windows\\system32', 'C:\\Windows', 'C:\\Program Files\\node\\']
```

## path.dirname（path）
返回目录名，尾/会被舍去
```
path.dirname('/foo/bar/baz/asdf/quux');
// Returns: '/foo/bar/baz/asdf'
path.dirname('/foo/bar/baz/asdf/quux/');
// Returns: '/foo/bar/baz/asdf'
```

## path.extname（path）
返回文件扩展名
```
path.extname('index.html');
// Returns: '.html'

path.extname('index.coffee.md');
// Returns: '.md'

path.extname('index.');
// Returns: '.'

path.extname('index');
// Returns: ''

path.extname('.index');
// Returns: ''

path.extname('.index.md');
// Returns: '.md'
```

## path.format（pathObject）
拼接路径
- pathObject \<object>
  - dir \<string>
  - root \<string>
  - base \<string>
  - name \<string>
  - ext \<string>
  - 返回：\<string>  

dir和root只能存在一个，dir优先级高

base 与 name.ext只能存在一个，base优先级高

## path.parse（path）
```
path.parse('/home/user/dir/file.txt');
// Returns:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
```

## path.isAbsolute(path)
```
windows
path.isAbsolute('//server');    // true
path.isAbsolute('\\\\server');  // true
path.isAbsolute('C:/foo/..');   // true
path.isAbsolute('C:\\foo\\..'); // true
path.isAbsolute('bar\\baz');    // false
path.isAbsolute('bar/baz');     // false
path.isAbsolute('.');           // false
```

## path.join([...paths])
将所有path拼在一起，根据..啥的返回绝对地址  
开始第一个地址/有或无表示绝对地址，后面会自动加上
## path.resolve([...paths])
与join有点相似  
没有表示绝对地址会按现在地址加上
```
path.resolve('/foo/bar', './baz');
// Returns: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// Returns: '/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// If the current working directory is /home/myself/node,
// this returns '/home/myself/node/wwwroot/static_files/gif/image.gif'
```

## path.relative(from，to)
输入两个地址返回相对值
```
path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
// Returns: '../../impl/bbb'
```
## path.sep
路径分隔符