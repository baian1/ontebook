# 中间件

可以是多个回调函数,  
可以是多个回调函数组成的数组
可以是上面两者的结合

```
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
```

next()表示调用下一个中间件
next("route")表示绕过剩余的路由回调，传递给下一个匹配的路由

# app.route()

对于一个路由,方便的设置多种请求

```
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
```

# 模块化路由中间件

每一个路由都相当于一个小的 application

```
//创建一个路由
var router = express.Router();
//路由中间件
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 将路由挂在app上
app.use('/', router);
```
