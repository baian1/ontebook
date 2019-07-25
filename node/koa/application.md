## util.insect.custom
```
if (util.inspect.custom) {
  this[util.inspect.custom] = this.inspect;
}

inspect() {
  return this.toJSON();
}

toJSON() {
  return only(this, [
    'subdomainOffset',
    'proxy',
    'env'
  ]);
}

function only(obj, keys){
  obj = obj || {};
  if ('string' == typeof keys) keys = keys.split(/ +/);
  return keys.reduce(function(ret, key){
    if (null == obj[key]) return ret;
    ret[key] = obj[key];
    return ret;
  }, {});
};
```
这个方法将返回Application实例上的三个属性

## middle
```
use(fn) {
  if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
  if (isGeneratorFunction(fn)) {
    deprecate('Support for generators will be removed in v3. ' +
              'See the documentation for examples of how to convert old middleware ' +
              'https://github.com/koajs/koa/blob/master/docs/migration.md');
    fn = convert(fn);
  }
  debug('use %s', fn._name || fn.name || '-');
  this.middleware.push(fn);
  return this;
}
```
老版本Generator转换到新的await/async
将中间件添加到middleware数组中保存

```
callback() {
  const fn = compose(this.middleware);

  if (!this.listenerCount('error')) this.on('error', this.onerror);

  const handleRequest = (req, res) => {
    const ctx = this.createContext(req, res);
    return this.handleRequest(ctx, fn);
  };

  return handleRequest;
}
```
服务器的回调函数handleRequest,用箭头函数绑定了this,  
当有请求的时候将req和res丢到ctx上,然后进行中间件处理

compose(this.middleware)返回一个调用所有中间件的入口函数,执行这个函数后，通过dispatch不断执行中间件处理函数，传入dispatch.bind(null, i + 1)就是中间件的next，调用报错的时候会被外层try捕获并返回Promise.reject，停止执行下一个中间件  
这个处理过程是直接对ctx进行相应的操作
```
function compose (middleware) {
  return function (context, next) {
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

计算发生错误的回调函数，没有的话加入自带的
```
onerror(err) {
  if (!(err instanceof Error)) throw new TypeError(util.format('non-error thrown: %j', err));

  if (404 == err.status || err.expose) return;
  if (this.silent) return;

  const msg = err.stack || err.toString();
  console.error();
  console.error(msg.replace(/^/gm, '  '));
  console.error();
}
```

通过中间件入口函数执行完所有的,没有报错就执行handleResponse,对ctx进行返回处理，报错就通过onerror返回  
respond中根据req methon,对返回body进行了处理
```
handleRequest(ctx, fnMiddleware) {
  const res = ctx.res;
  res.statusCode = 404;
  const onerror = err => ctx.onerror(err);
  const handleResponse = () => respond(ctx);
  onFinished(res, onerror);
  return fnMiddleware(ctx).then(handleResponse).catch(onerror);
}
```
## listen
```
listen(...args) {
  debug('listen');
  const server = http.createServer(this.callback());
  return server.listen(...args);
}
```
指定处理函数，并在端口开启服务
