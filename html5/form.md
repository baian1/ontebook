# form

- accept-charset  
服务器支持的字符编码
- action  
处理信息的URL  
可以被button何input的formaction覆盖
- autocomplete  
表示input的输入内容能不能自动补全,可以被子元素的autocomplete覆盖  
note:如果设置为off记得设置子元素也为off
- method  
提交表单的方式
- enctype  
当提交类型为post时按照enctype对数据进行处理,然后提交
  1. application/x-www-form-urlencoded: 未指定属性时的默认值。
  2. multipart/form-data: 这个值用于一个 type 属性设置为 "file" 的\<input> 元素。
  3. text/plain (HTML5)
- name  
html5中表示表单的名字,必须唯一
- novalidate  
表示表单是否被验证,默认是通过验证
- target  
表示提交表单后,在哪里处理返回信息
  1. _self: 在当前HTML4或HTML5文档页面重新加载返回值。这个是默认值。译注：也就是说如果这个文档在一个frame中的话，self是在当前frame（document）中重新加载的，而不是整个页面（window）。
  2. _blank: 以新的HTML4或HTML5文档窗口加载返回值。
  3. _parent: 在父级的frame中以HTML4或HTML5文档形式加载返回值，如果没有父级的frame，行为和_self一致。
  4. _top: 如果是HTML 4文档: 清空当前文档，加载返回内容；HTML5: 在当前文档的最高级内加载返回值，如果没有父级，和_self的行为一致。
  5. iframename: 返回值在指定frame中加载。
## input
表当中的input为file类型时,可以接收一个accept属性,表示文件类型

## FormData对象
可以通过创建对象,使用浏览器内置的表单提交方式发送,处理数据  
可以从已有表单创建数据,也可以创建空的表单
```
var formData = new FormData(someFormElement);
```
添加数据
```
formData.append("serialnumber", serialNumber++);
```
FormData对象附加File或Blob类型文件  
使用append()方法时，可以通过第三个可选参数设置发送请求的头 Content-Disposition 指定文件名。如果不指定文件名（或者不支持该参数时），将使用名字“blob”。
```
data.append("myfile", myBlob, "filename.txt");
```

## ajax提交数据
[序列化数据](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)