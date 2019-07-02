# connectAdvanced
判断很多要移除的api,并给出提示
```
invariant(
  renderCountProp === undefined,
  `renderCountProp is removed. render counting is built into the latest React Dev Tools profiling extension`
)

invariant(
  !withRef,
  'withRef is removed. To access the wrapped instance, use a ref on the connected component'
)

const customStoreWarningMessage =
  'To use a custom Redux store for specific components, create a custom React context with ' +
  "React.createContext(), and pass the context object to React Redux's Provider and specific components" +
  ' like: <Provider context={MyContext}><ConnectedComponent context={MyContext} /></Provider>. ' +
  'You may also pass a {context : MyContext} option to connect'

invariant(
  storeKey === 'store',
  'storeKey has been removed and does not do anything. ' +
    customStoreWarningMessage
)
```
保存context
```
//context是输入的参数,默认值是Provide的ReactReduxContext
const Context = context
```
# wrapWithConnect
创建一个组件包裹WrappedComponent  
并继承他的静态属性

## store
当store改变时,child的props都会根据改变更新  
childPropsSelector是一个根据新的state和ownProps返回组合后的props的函数
```
function createChildSelector(store) {
  return selectorFactory(store.dispatch, selectorFactoryOptions)
}
const childPropsSelector = useMemo(() => {
  // The child props selector needs the store reference as an input.
  // Re-create this selector whenever the store changes.
  return createChildSelector(store)
}, [store])
```

## 首次加载
这里可以看到props一旦改变,引起需要计算的东西就比较多(这个props是指ownProps)
```
//获取ref,props,还有特殊的props.context
const [propsContext, forwardedRef, wrapperProps] = useMemo(() => {
  // Distinguish between actual "data" props that were passed to the wrapper component,
  // and values needed to control behavior (forwarded refs, alternate context instances).
  // To maintain the wrapperProps object reference, memoize this destructuring.
  const { forwardedRef, ...wrapperProps } = props
  return [props.context, forwardedRef, wrapperProps]
}, [props])
```

context保存了传入的store和subscription
```
//如果传入了自己的context实例,那么就用自己的,没有就用ReactReduxContext
const ContextToUse = useMemo(() => {
  // Users may optionally pass in a custom context instance to use instead of our ReactReduxContext.
  // Memoize the check that determines which context instance we should use.
  return propsContext &&
    propsContext.Consumer &&
    isContextConsumer(<propsContext.Consumer />)
    ? propsContext
    : Context
}, [propsContext, Context])
```
```
// The store _must_ exist as either a prop or in context
const didStoreComeFromProps = Boolean(props.store)
const didStoreComeFromContext =
  Boolean(contextValue) && Boolean(contextValue.store)

//获取store
const store = props.store || contextValue.store
```
## 首次加载订阅更新
```
//subscription用来添加子节点
//notifyNestedSubs用来触发子节点
const [subscription, notifyNestedSubs] = useMemo(() => {
  //死活不改变,option选项
  if (!shouldHandleStateChanges) return NO_SUBSCRIPTION_ARRAY

  //有父sub就塞到父sub的listent,没有就设为null,会放到store的sub中
  const subscription = new Subscription(
    store,
    didStoreComeFromProps ? null : contextValue.subscription
  )

  const notifyNestedSubs = subscription.notifyNestedSubs.bind(
    subscription
  )

  return [subscription, notifyNestedSubs]
}, [store, didStoreComeFromProps, contextValue])
```

```
//设置新的context,他的子节点更新都依赖于它subscription,这样一颗树的结点就会按顺序从上到下,从前往后更新
const overriddenContextValue = useMemo(() => {
  //context是自定义的,那么这个就是最初节点
  //subscription是在store上的,将onchangeState放到上一个subscription中
  if (didStoreComeFromProps) {
    return contextValue
  }
  //继承上一个subscription
  //将onchangeState放到上一个subscription中
  return {
    ...contextValue,
    subscription
  }
}, [didStoreComeFromProps, contextValue, subscription])
```

## 记录更新
```
//设置初始值为0,并在每次更新记录action.payload传入previousStateUpdateResult
function storeStateUpdatesReducer(state, action) {
  const [, updateCount] = state
  return [action.payload, updateCount + 1]
}
const EMPTY_ARRAY = []
const initStateUpdates = () => [null, 0]

//previousStateUpdateResult用来记录要更新的数据
//forceComponentUpdateDispatch用来触发重新渲染
const [
  [previousStateUpdateResult],
  forceComponentUpdateDispatch
] = useReducer(storeStateUpdatesReducer, EMPTY_ARRAY, initStateUpdates)

if (previousStateUpdateResult && previousStateUpdateResult.error) {
  throw previousStateUpdateResult.error
}

//触发更新操作
forceComponentUpdateDispatch({
  type: 'STORE_UPDATED',
  payload: {
    latestStoreState,
    error
  }
})
```

## 重渲染
```
//保存状态
//最后一次Prop状态,state中提取的
const lastChildProps = useRef()
//wrap的props状态
const lastWrapperProps = useRef(wrapperProps)
const childPropsFromStoreUpdate = useRef()
//是否需要重渲染
const renderIsScheduled = useRef(false)
```

```
//返回新的actualChildProps拿去当作子节点props值
const actualChildProps = usePureOnlyMemo(() => {
  //单纯的由childPropsFromStoreUpdate触发的更新,OwnProps不改变
  if (
    childPropsFromStoreUpdate.current &&
    wrapperProps === lastWrapperProps.current
  ) {
    return childPropsFromStoreUpdate.current
  }
  //由OwnProps变化触发的更新
  return childPropsSelector(store.getState(), wrapperProps)
}, [store, previousStateUpdateResult, wrapperProps])
```
```
useIsomorphicLayoutEffect(() => {
  // We want to capture the wrapper props and child props we used for later comparisons
  lastWrapperProps.current = wrapperProps
  lastChildProps.current = actualChildProps
  renderIsScheduled.current = false

  // If the render was from a store update, clear out that reference and cascade the subscriber update
  if (childPropsFromStoreUpdate.current) {
    childPropsFromStoreUpdate.current = null
    notifyNestedSubs()
  }
})
```



## 根据store变化 更新数据
```
useIsomorphicLayoutEffect(() => {
  // If we're not subscribed to the store, nothing to do here
  if (!shouldHandleStateChanges) return

  // Capture values for checking if and when this component unmounts
  let didUnsubscribe = false
  let lastThrownError = null

  // We'll run this callback every time a store subscription update propagates to this component
  const checkForUpdates = () => {
    if (didUnsubscribe) {
      // Don't run stale listeners.
      // Redux doesn't guarantee unsubscriptions happen until next dispatch.
      return
    }

    //state更新后根据新的storeState获取props
    const latestStoreState = store.getState()
    let newChildProps, error
    try {
      // Actually run the selector with the most recent store state and wrapper props
      // to determine what the child props should be
      newChildProps = childPropsSelector(
        latestStoreState,
        lastWrapperProps.current
      )
    } catch (e) {
      error = e
      lastThrownError = e
    }

    if (!error) {
      lastThrownError = null
    }

    if (newChildProps === lastChildProps.current) {
      // 这次结点没有更新,并且他不在渲染队列,手动触发子节点更新
      if (!renderIsScheduled.current) {
        notifyNestedSubs()
      }
    } else {
      //结点不同时触发更新,并在更新完后触发子节点更新
      //现在可以触发useState/useReducer更新
      //如果直接将更新放在useState/useReducer,那可能会强制渲染我们不需要渲染的值,
      //这样写可控性更高
      lastChildProps.current = newChildProps
      childPropsFromStoreUpdate.current = newChildProps
      renderIsScheduled.current = true

      // If the child props _did_ change (or we caught an error), this wrapper component needs to re-render
      forceComponentUpdateDispatch({
        type: 'STORE_UPDATED',
        payload: {
          latestStoreState,
          error
        }
      })
    }
  }

  return unsubscribeWrapper
}, [store, subscription, childPropsSelector])
```
```
// 绑定更新操作
// 当上级更新时触发checkForUpdates
subscription.onStateChange = checkForUpdates
//将自己的onStateChange绑定到上一级listener中
subscription.trySubscribe()

// 初始化的时候触发一个更新
checkForUpdates()

//组件卸载的时候触发
//didUnsubscribe表示这个组件已经卸载了,虽然checkForUpdates还在父listener队列中,用来截断更新操作
//subscription.tryUnsubscribe()把子组件的监听都卸载掉
const unsubscribeWrapper = () => {
  didUnsubscribe = true
  subscription.tryUnsubscribe()

  if (lastThrownError) {
    // It's possible that we caught an error due to a bad mapState function, but the
    // parent re-rendered without this component and we're about to unmount.
    // This shouldn't happen as long as we do top-down subscriptions correctly, but
    // if we ever do those wrong, this throw will surface the error in our tests.
    // In that case, throw the error from here so it doesn't get lost.
    throw lastThrownError
  }
}
```

## 高阶函数
```
// Now that all that's done, we can finally try to actually render the child component.
// We memoize the elements for the rendered child component as an optimization.
const renderedWrappedComponent = useMemo(
  () => <WrappedComponent {...actualChildProps} ref={forwardedRef} />,
  [forwardedRef, WrappedComponent, actualChildProps]
)

// If React sees the exact same element reference as last time, it bails out of re-rendering
// that child, same as if it was wrapped in React.memo() or returned false from shouldComponentUpdate.
const renderedChild = useMemo(() => {
  if (shouldHandleStateChanges) {
    // If this component is subscribed to store updates, we need to pass its own
    // subscription instance down to our descendants. That means rendering the same
    // Context instance, and putting a different value into the context.
    return (
      <ContextToUse.Provider value={overriddenContextValue}>
        {renderedWrappedComponent}
      </ContextToUse.Provider>
    )
  }

  return renderedWrappedComponent
}, [ContextToUse, renderedWrappedComponent, overriddenContextValue])

//这个可以使父组件渲染的时候不会渲染这个子组件,除非props改变,相当于PureComponent
const Connect = pure ? React.memo(ConnectFunction) : ConnectFunction

Connect.WrappedComponent = WrappedComponent
Connect.displayName = displayName

//有ref就传递ref
if (forwardRef) {
  const forwarded = React.forwardRef(function forwardConnectRef(
    props,
    ref
  ) {
    return <Connect {...props} forwardedRef={ref} />
  })

  forwarded.displayName = displayName
  forwarded.WrappedComponent = WrappedComponent
  return hoistStatics(forwarded, WrappedComponent)
}

return hoistStatics(Connect, WrappedComponent)
```