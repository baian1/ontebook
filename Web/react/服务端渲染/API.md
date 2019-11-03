# API

## 服务器 API

- renderToString() 与 renderToNodeStream()  
   renderToString 返回 html 字符串结果,renderToNodeStream 返回字符串的可读流
- renderToStaticMarkup() 与 renderToStaticNodeStream()
  与上面的相比,生成静态页面,不会有一些 react 专用的 dom 属性

## 客户端

hydrate()可以给 dom 树添加上事件
