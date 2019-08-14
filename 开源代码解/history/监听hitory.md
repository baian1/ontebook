# 监听

通过调用 history 的 listen,将回调函数传递给 transitionManager,会在 history 变化的时候触发

设置有一个 setState(nextState) 函数用来触发 transitionManager.notifyListeners(history.location, history.action),还是调用 setState

触发方式:

- BrowserHistory 通过主动调用 setState 和监听 location window.addEventListener(PopStateEvent, handlePopState)来触发(handlePopState 里调用 setState)
- HashHistory 是主动和监听 hash 变化触发
- MemoryHistory 全靠主动触发
