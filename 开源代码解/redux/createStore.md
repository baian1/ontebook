# createStore
通过创建闭包函数，将变量保存到内存中  
通过返回方法访问数据  
```
function createStore(reducer, preloadedState, enhancer)
```
## 内部变量
```
let currentReducer = reducer
let currentState = preloadedState
let currentListeners = []
let nextListeners = currentListeners
let isDispatching = false
```
- reducer  
  根据动作与state返回新的state函数
- state  
  保存的数据
- Listener
  会在每次dispatch后执行,可以获取state变化等
- isDispatching  
  dispatch状态,防止数据在变化时进行其他操作导致错误

## 内部函数
```
function ensureCanMutateNextListeners()
```
对listener进行浅复制,生成一个快照,保证在dispatch调用的时候,改变listener列表不会对这次dispatch造成影响

```
const listeners = (currentListeners = nextListeners)
for (let i = 0; i < listeners.length; i++) {
  const listener = listeners[i]
  listener()
}
```
是在dispatch中调用的  
触发dispatch时也会触发左右Listener

## 暴露函数

### dispatch
```
function dispatch(action) {
  try {
    isDispatching = true
    //根据state和action返回新的state
    currentState = currentReducer(currentState, action)
  } finally {
    isDispatching = false
  }

  return action
}
```
dispatch就是将state与action传入,更新state的操作

### replaceReducer
```
function replaceReducer(nextReducer) {
  if (typeof nextReducer !== 'function') {
    throw new Error('Expected the nextReducer to be a function.')
  }

  currentReducer = nextReducer
  dispatch({ type: ActionTypes.REPLACE })
}
```
用于分割代码后,动态加载数据的时候改变reducer时使用  
改变reducer后使用dipatch,用旧树的数据填充新树


### subscribe
增加加listener
### observable