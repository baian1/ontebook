# middle
redux可以通过中间件来增强dispatch  
createStore中的使用
```
enhancer(createStore)(reducer, preloadedState)
```

1. 通过applyMiddleware将需要用到的中间件函数保存下来  
2. 返回一个函数接收createStore函数  
   用来创造store
3. 返回一个接收createStore的参数的函数
4. 创建store,包装dispatch,返回store的函数和包装过的dispatch
```
function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
```

## 中间件包装
例子redux-thunk
```
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}
```
中间件使用了闭包,先是传入了dispatch和getState,其中dispatch使用的是局部变量,先定义了一个默认的的dispatch,再用包裹后的dispatch代替

返回一个类似
```
(next)=>(action)=>{
  return next(action)
}
```
这个函数将传入的函数next进行包裹,返回一个新的函数,在新函数执行的时候会执行next(action)函数  

通过串联函数,可以将其包裹成  
compose(f, g, h)  
(...args) => f(g(h(...args))).
```
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```
形成类似下面函数返回
```
function merge3(fun) {
  return function (fun) {
    return function (fun) {
      return f(fun)
    }(g(fun))
  }(h(fun))
}
```
