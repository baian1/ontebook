# combineReducers
Reducer函数是输入state和action,返回新的state  
这个函数是将多个Reducer合并  

## 保存reducer
获取reducers,通过闭包保存
```
function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers)
  const finalReducers = {}
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i]

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  const finalReducerKeys = Object.keys(finalReducers)
  return (state,action)=>{

  }
}
```

## 调用reducers
1. 参数state与action
2. 执行每个reducer,通过判断返回是否改变来确认数据是否更新
3. 将返回数据保存到nextState中
4. 有新数据就返回新树  
   没有新数据返回老树,表示数据没有更新
```
function combination(state = {}, action) {
  let hasChanged = false
  const nextState = {}
  for (let i = 0; i < finalReducerKeys.length; i++) {
    const key = finalReducerKeys[i]
    const reducer = finalReducers[key]
    const previousStateForKey = state[key]
    const nextStateForKey = reducer(previousStateForKey, action)
    if (typeof nextStateForKey === 'undefined') {
      const errorMessage = getUndefinedStateErrorMessage(key, action)
      throw new Error(errorMessage)
    }
    nextState[key] = nextStateForKey
    hasChanged = hasChanged || nextStateForKey !== previousStateForKey
  }
  return hasChanged ? nextState : state
}
```
