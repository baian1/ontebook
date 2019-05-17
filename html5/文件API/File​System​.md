# File And Directory

## 两种方式使用
drop事件中的data中的DataTransferItem.webkitGetAsEntry()，返回FileEntry或者DirectoryEntry  
input元素的webkitEntries，需要webkitdirectory为true



## FileEntry
File文件可以使用file返回File类型

## DirectoryEntry
目录的读取先用createReader()返回一个DirectoryReader对象，
调用DirectoryReader对象的readEntries方法，输入回调函数(entries)=>void
在回调函数内处理文件:  
entries是一个数组，每个元素FileEntry或DirectoryEntry

