# drop and drage API

## event

|Event    |On Event Handler|descript                                                       |
|-----    |----------------|---------------------------------------------------------------|
|drag     |ondrag          |当拖动元素或选中的文本时触发。                                    |
|dragend	|ondragend	     |当拖拽操作结束时触发 (比如松开鼠标按键或敲“Esc”键). (见结束拖拽)    |
|dragenter|	ondragenter    |当拖动元素或选中的文本到一个可释放目标时触发（见 指定释放目标）。    |
|dragexit |	ondragexit	   |当元素变得不再是拖动操作的选中目标时触发。                         |
|dragleave|ondragleave	   |当拖动元素或选中的文本离开一个可释放目标时触发。                    |
|dragover	|ondragover	     |当元素或选中的文本被拖到一个可释放目标上时触发（每100毫秒触发一次）。|
|dragstart|ondragstart	   |当用户开始拖动一个元素或选中的文本时触发（见开始拖动操作）。         |
|drop	    |ondrop	         |当元素或选中的文本在可释放目标上被释放时触发（见执行释放）。         |

## 阻止浏览器默认操作
dragover与drop事件中阻止默认操作

## 数据保存
event中的dataTransfer保存了数据  
数据类型:纯文本，URL，HTML代码，文件  
files文件是从PC拖动过来的  
item是文件的内容，比如一张网页上的图片，会出现三个元素  
0: DataTransferItem {kind: "string", type: "text/plain"}  
1: DataTransferItem {kind: "string", type: "text/uri-list"}  
2: DataTransferItem {kind: "string", type: "text/html"}  
### API
DataTransferItem.getAsFile()
返回一个关联拖拽项的 File 对象 （当拖拽项不是一个文件时返回 null）。
DataTransferItem.getAsString()
使用拖拽项的字符串作为参数执行指定回调函数。
 
## example
### 文件从PC上拖到浏览器内
drop时，数据存在event对象中  

#### 加载文件  
从event对象中dataTransfer的files中可以获取file类型文件,也可以从item队列中使用getAsFile()返回

#### 数据读取
可以使用FileReader读取数据信息 或 URL.createObjectURL设置一个地址指向数据