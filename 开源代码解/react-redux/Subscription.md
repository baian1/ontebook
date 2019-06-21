# Subscription
```
class Subscription {
  constructor(store, parentSub) {
    this.store = store
    this.parentSub = parentSub
    this.unsubscribe = null
    this.listeners = nullListeners

    this.handleChangeWrapper = this.handleChangeWrapper.bind(this)
  }

  //添加listener
  addNestedSub(listener) {
    this.trySubscribe()
    return this.listeners.subscribe(listener)
  }

  //触发所有listener
  notifyNestedSubs() {
    this.listeners.notify()
  }

  //保证change的时候触发更新
  handleChangeWrapper() {
    if (this.onStateChange) {
      this.onStateChange()
    }
  }

  isSubscribed() {
    return Boolean(this.unsubscribe)
  }

  trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub
        //如果没有传入parentSub,订阅放在store.subscribe
        //传入了parentSub,订阅放在parentSub.addNestedSub
        //保证父更新后能更新一系列子节点
        ? this.parentSub.addNestedSub(this.handleChangeWrapper)
        : this.store.subscribe(this.handleChangeWrapper)

      this.listeners = createListenerCollection()
    }
  }

  tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe()
      this.unsubscribe = null
      this.listeners.clear()
      this.listeners = nullListeners
    }
  }
}
```

# ListenerCollection
```
function createListenerCollection() {
  //用来执行输入的函数
  const batch = getBatch()

  //使用两个数组保存监听的函数
  //操作next数组,只在执行的时候同步next和current
  //保证不会出错
  let current = []
  let next = []

  return {

    //清除Listener
    clear() {
      next = CLEARED
      current = CLEARED
    },

    //触发Listener
    notify() {
      const listeners = (current = next)
      batch(() => {
        for (let i = 0; i < listeners.length; i++) {
          listeners[i]()
        }
      })
    },

    //获取Listener
    get() {
      return next
    },

    //订阅Listener
    subscribe(listener) {
      let isSubscribed = true

      //一份current浅拷贝
      if (next === current) next = current.slice()
      next.push(listener)

      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return
        isSubscribed = false

        if (next === current) next = current.slice()
        next.splice(next.indexOf(listener), 1)
      }
    }
  }
}
```