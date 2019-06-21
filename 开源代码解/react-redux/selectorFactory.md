# selectorFactory
根据数据变化返回相应的props  
option中的pure可以设置强行每次都更新
```
export default function finalPropsSelectorFactory(
  dispatch,
  { initMapStateToProps, initMapDispatchToProps, initMergeProps, ...options }
) {
  //经过wrapMapToProps包装的函数,返回一个initProxySelector(dispatch, { displayName }){}到变量
  //这里将代理函数返回,可以使用获取state和dispatch以及整合mergeProps
  const mapStateToProps = initMapStateToProps(dispatch, options)
  const mapDispatchToProps = initMapDispatchToProps(dispatch, options)
  const mergeProps = initMergeProps(dispatch, options)

  //根据pure选择强制更新
  const selectorFactory = options.pure
    ? pureFinalPropsSelectorFactory
    : impureFinalPropsSelectorFactory

  return selectorFactory(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    dispatch,
    options
  )
}
```

返回一个函数,可以根据输入的state和ownProps输出整合后的prop
```
function impureFinalPropsSelector(state, ownProps){}
或
function pureFinalPropsSelector(nextState, nextOwnProps) {}
```
# impureFinalPropsSelectorFactory
每次重新渲染不进行判断,直接返回新的props
```
export function impureFinalPropsSelectorFactory(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  dispatch
) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(
      mapStateToProps(state, ownProps),
      mapDispatchToProps(dispatch, ownProps),
      ownProps
    )
  }
}
```

# pureFinalPropsSelectorFactory
第一次渲染直接用新的props
```
function handleFirstCall(firstState, firstOwnProps) {
  state = firstState
  ownProps = firstOwnProps
  stateProps = mapStateToProps(state, ownProps)
  dispatchProps = mapDispatchToProps(dispatch, ownProps)
  mergedProps = mergeProps(stateProps, dispatchProps, ownProps)
  hasRunAtLeastOnce = true
  return mergedProps
}
```

更新数据
redux的数据更新,如果结点没有更新,state中返回的数据就不会改变,props就不会改变,不会进行没必要的渲染
```
//根据数据变化选择合适处理函数
//都没变就返回原来的props
function handleSubsequentCalls(nextState, nextOwnProps) {
  const propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps)
  const stateChanged = !areStatesEqual(nextState, state)
  state = nextState
  ownProps = nextOwnProps

  if (propsChanged && stateChanged) return handleNewPropsAndNewState()
  if (propsChanged) return handleNewProps()
  if (stateChanged) return handleNewState()
  return mergedProps
}
```

```
//state和ownProps都改变
function handleNewPropsAndNewState() {
  stateProps = mapStateToProps(state, ownProps)

  if (mapDispatchToProps.dependsOnOwnProps)
    dispatchProps = mapDispatchToProps(dispatch, ownProps)

  mergedProps = mergeProps(stateProps, dispatchProps, ownProps)
  return mergedProps
}

//只有ownProps改变
function handleNewProps() {
  if (mapStateToProps.dependsOnOwnProps)
    stateProps = mapStateToProps(state, ownProps)

  if (mapDispatchToProps.dependsOnOwnProps)
    dispatchProps = mapDispatchToProps(dispatch, ownProps)

  mergedProps = mergeProps(stateProps, dispatchProps, ownProps)
  return mergedProps
}

//只有state改变
function handleNewState() {
  const nextStateProps = mapStateToProps(state, ownProps)
  const statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps)
  stateProps = nextStateProps

  if (statePropsChanged)
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps)

  return mergedProps
}
```