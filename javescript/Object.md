# entries
将一个对象的参数转为数组[[key,value],[key,value]...]，每个元素都是含有两个参数的数组[key,value]

# fromEntries
可以通过这个方法将entries获取的数组逆向转换
```
//可以过滤属性
const object={x:42,y:50,abc:9001};
const result = Object.fromEntries(
  Object.entries(object)
    .filter(([key,value])=>key.length===1)
    .map(([key,value])=>[key,calue*2])
)
--->
{x: 84, y: 100}
```