# bindActionCreators
可以将actions更简单地整合,方便使用

比如
```
export const set = (value) => ({
  type: SET_COUNTER,
  payload: value
})

export const increment = () => ({
  type: INCREMENT_COUNTER
})

export const decrement = () => ({
  type: DECREMENT_COUNTER
})

export const incrementIfOdd = () => (dispatch, getState) => {
  const { counter } = getState()

  if (counter % 2 === 0) {
    return
  }

  dispatch(increment())
}
```

action的使用
```
import * as CounterActions from '../actions'

const mapDispatchToProps = (dispatch) => {
  return {
    set:(...arg)=>dispatch(CounterActions.set(...arg)),
    increment:(...arg)=>dipatch(CounterActions.increment(...arg)),
    ...
  }
}
变为
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(CounterActions, dispatch)
}
```

## 实现
```
function bindActionCreator(actionCreator, dispatch) {
  return function() {
    return dispatch(actionCreator.apply(this, arguments))
  }
}
```
```
function bindActionCreators(actionCreators, dispatch) {

  const boundActionCreators = {}
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}
```
通过创建对象boundActionCreators将多个action绑定在上边,使用了apply绑定了this,react中使用可以通过this在action函数中访问props