# koa

## application
初始化
```
createContext(req, res) {
  const context = Object.create(this.context);
  const request = context.request = Object.create(this.request);
  const response = context.response = Object.create(this.response);

  context.app = request.app = response.app = this;
  context.req = request.req = response.req = req;
  context.res = request.res = response.res = res;
  request.ctx = response.ctx = context;
  request.response = response;
  response.request = request;
  context.originalUrl = request.originalUrl = req.url;
  context.state = {};
  return context;
}
```
先是根据原来定义的三个对象创建context,request,response

这三个对象上都是代理其上的参数，有app，req，res  
是对这几个进行了一层封装  
方便我们使用

## 库
### delegate
代理  
可以将context上的response中的属性值与方法用context.的方式直接访问
```
const context = Object.create(this.context);
const request = context.request = Object.create(this.request);
const response = context.response = Object.create(this.response);
```

代理初始化函数
```
function Delegator(proto, target) {
  if (!(this instanceof Delegator)) return new Delegator(proto, target);
  this.proto = proto;      
  this.target = target;    //访问proto上的属性将会被映射到target上
  this.methods = [];
  this.getters = [];
  this.setters = [];
  this.fluents = [];
}
```

代理的属性有:
- set属性
```
Delegator.prototype.getter = function (name) {
  var proto = this.proto;
  var target = this.target;
  this.getters.push(name);

  Object.defineProperty(proto, name, {
    get: function () {
      return this[target][name];
    }
  })//从需要代理的proto对象上的属性名 代理到 target上相应的属性名

  return this;
};
```
- get属性
- access属性
与上类似

- methon方法
```
Delegator.prototype.method = function (name) {
  var proto = this.proto;
  var target = this.target;
  this.methods.push(name);

  proto[name] = function () {
    return this[target][name].apply(this[target], arguments);
  };//将target上的方法代理到proto上

  return this;
};
```