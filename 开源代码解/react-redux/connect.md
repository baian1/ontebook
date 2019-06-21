# connect
mapStateToProps?: Function
mapDispatchToProps?: Function | Object
mergeProps?: Function
options?: Object
{
  pure = true,
  areStatesEqual = strictEqual,
  areOwnPropsEqual = shallowEqual,
  areStatePropsEqual = shallowEqual,
  areMergedPropsEqual = shallowEqual,
  ...extraOptions
} = {}

# Props
将属性附加到props上

## match函数
把参数一个个用不同的方法处理,返回正确的,我们需要的函数格式  
达到支持多种参数类型的目的
```
function match(arg, factories, name) {
  for (let i = factories.length - 1; i >= 0; i--) {
    const result = factories[i](arg)
    if (result) return result
  }

  return (dispatch, options) => {
    throw new Error(
      `Invalid value of type ${typeof arg} for ${name} argument when connecting component ${
        options.wrappedComponentName
      }.`
    )
  }
}
```
## wrapMapToProps
1. wrapMapToPropsConstant
当connect的参数为非函数时使用

2. wrapMapToPropsFunc
connect的参数是函数
函数接收两个参数:  
- state/dispatch: Object  
- ownProps?: Object  
```
//通过函数参数个数判断是不是需要OwnProps
export function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null &&
    mapToProps.dependsOnOwnProps !== undefined
    ? Boolean(mapToProps.dependsOnOwnProps)
    : mapToProps.length !== 1
}
```
```
export function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, { displayName }) {

    //代理mapToProps,确认输入参数
    const proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps
        ? proxy.mapToProps(stateOrDispatch, ownProps)
        : proxy.mapToProps(stateOrDispatch)
    }

    // allow detectFactoryAndVerify to get ownProps
    proxy.dependsOnOwnProps = true

    proxy.mapToProps = function detectFactoryAndVerify(
      stateOrDispatch,
      ownProps
    ) {
      //通过调用mapToProps返回需要的dispatch方法或者state中的属性状态
      proxy.mapToProps = mapToProps
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps)
      let props = proxy(stateOrDispatch, ownProps)

      if (typeof props === 'function') {
        proxy.mapToProps = props
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props)
        props = proxy(stateOrDispatch, ownProps)
      }

      if (process.env.NODE_ENV !== 'production')
        verifyPlainObject(props, displayName, methodName)

      return props
    }

    return proxy
  }
}
```
## mapStateToProps与mapStateToProps
```
//有function就绑定函数上去
export function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function'
    ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps')
    : undefined
}
//没有值就绑定一个返回dispatch的函数，方便props.dispatch组件调用
export function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps
    ? wrapMapToPropsConstant(dispatch => ({ dispatch }))
    : undefined
}
//是一个对象的话就自动调用redux的bindActionCreators创造返回
export function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && typeof mapDispatchToProps === 'object'
    ? wrapMapToPropsConstant(dispatch =>
        bindActionCreators(mapDispatchToProps, dispatch)
      )
    : undefined
}

export default [
  whenMapDispatchToPropsIsFunction,
  whenMapDispatchToPropsIsMissing,
  whenMapDispatchToPropsIsObject
]
```

## mergeprops
如果指定，则定义如何确定自己的包装组件的最终道具。
```
export function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(
    dispatch,
    { displayName, pure, areMergedPropsEqual }
  ) {
    let hasRunOnce = false
    let mergedProps

    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      const nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps)

      if (hasRunOnce) {
        //props更改或者pure为false,才返回新的props
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps))
          mergedProps = nextMergedProps
      } else {
        //第一次执行直接改变props
        hasRunOnce = true
        mergedProps = nextMergedProps

        if (process.env.NODE_ENV !== 'production')
          verifyPlainObject(mergedProps, displayName, 'mergeProps')
      }

      return mergedProps
    }
  }
}
```
如果您不提供mergeProps，则{ ...ownProps, ...stateProps, ...dispatchProps }默认情况下会收到包装的组件,基本就是新的props了

## 返回一个高阶函数
```
connectHOC(selectorFactory, {
  // used in error messages
  methodName: 'connect',

  // used to compute Connect's displayName from the wrapped component's displayName.
  getDisplayName: name => `Connect(${name})`,

  // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
  shouldHandleStateChanges: Boolean(mapStateToProps),

  // passed through to selectorFactory
  initMapStateToProps,
  initMapDispatchToProps,
  initMergeProps,
  pure,
  areStatesEqual,
  areOwnPropsEqual,
  areStatePropsEqual,
  areMergedPropsEqual,

  // any extra options args can override defaults of connect or connectAdvanced
  ...extraOptions
})
```