# ArrayBuffer

ArrayBuffer 对象用于表示通用的固定长度原始二进制数据缓冲区。  
不能直接读取，需要通过 typed array objects(比如 Uint8Array) 或者 DataView
需要注意都是指向这个内存,改变时也是改变内存中的位置

## typed array objects

```
new TypedArray(); // new in ES2017
new TypedArray(length);
new TypedArray(typedArray);//从一个typedArray对应位置复制一遍，溢出部分循环计算,255溢出254等于1
new TypedArray(object);//从object对象中新建一个出来
new TypedArray(buffer [, byteOffset [, length]]);//用于查看ArrayBuffer byteOffset,length开头与结束
```

## DataView

```
new DataView(buffer [, byteOffset [, byteLength]])
```

参数与上类似

- Properties  
  DataView.prototype.constructor  
  DataView.prototype.buffer **只读**  
  DataView.prototype.byteLength **只读**  
  DataView.prototype.byteOffset **只读**
- Methods  
  DataView.prototype.getInt8()  
  DataView.prototype.getUint8()  
  DataView.prototype.setInt8()  
  DataView.prototype.setUint8()  
  其他类似
