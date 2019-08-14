# Blob

Blob(blobParts[, options])  
```
var aBlob = new Blob(array [, options]);
```
- array is an Array of ArrayBuffer, ArrayBufferView, Blob, DOMString objects, or a mix of any of such objects, that will be put inside the Blob. DOMStrings are encoded as UTF-8.
- options is an optional BlobPropertyBag dictionary which may specify the following two attributes:
  - type, with a default value of "", that represents the MIME type of the content of the array that will be put in the blob.
  - endings, with a default value of "transparent", that specifies how strings containing the line ending character \n are to be written out. It is one of the two values: "native", meaning that line ending characters are changed to match host OS filesystem convention, or "transparent", meaning that endings are stored in the blob without change. 

- Properties  
  size  
  type
- Methods  
  slice

可以将数据从ArrayBuffer, ArrayBufferView, Blob, DOMString objects等混合类型复制一份,