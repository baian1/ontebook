# router
有两种路由可以选择：
<BrowserRouter>和<HashRouter>

## BrowserRouter

## HashRouter

# 路由匹配

## Route 
只要是匹配到地址，都会渲染出来
## switch
迭代所有route元素，只渲染第一个元素

# 页面跳转
## link
```
<Link to="/">Home</Link>
// <a href='/'>Home</a>

// location = { pathname: '/react' }
<NavLink to="/react" activeClassName="hurray">
  React
</NavLink>
// <a href='/react' className='hurray'>React</a>

<Redirect to="/login" />
```

## history
history.push

# Prompt
阻止跳转,会在跳转的时候触发这个组件
```
<Prompt
  when={isBlocking}
  message={location =>
    `Are you sure you want to go to ${location.pathname}`
  }
/>
```

# withRouter
当路由改变时，传递props属性值 { match, location, history } ，重新渲染。


# 传递参数

## props.params
```
<Route path='/user/:name' component={UserPage}></Route>
```
可以取到props.params.name

## query
利用url地址传递值
```
let path = {
    pathname: '/user',
    query: data,
}
<Link to={path}>用户</Link>

let {id,name,age} = this.props.location.query;
```

## state
类似post传值,可以传递任意类型的数据
```
let path = {
    pathname: '/user',
    state: data,
}
 
//页面跳转
<Link to={path}>用户</Link>
let data = this.props.location.state;
let {id,name,age} = data;
```