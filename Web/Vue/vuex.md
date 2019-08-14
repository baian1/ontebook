# state

存储数据

使用

```
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})

const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      //通过this.$store.state访问
      return this.$store.state.count
    }
  }
}

//一次性声明多个计算属性
computed: mapState({
  // 箭头函数可使代码更简练
  count: state => state.count,

  // 传字符串参数 'count' 等同于 `state => state.count`
  countAlias: 'count',

  // 为了能够使用 `this` 获取局部状态，必须使用常规函数
  countPlusLocalState (state) {
    return state.count + this.localCount
  }
})
```

# geter

一些依赖 state 的计算属性,很多组件都需要时,可以写在 geter 里

使用与上同

```
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
```

# Mutation

用于改变 state

```
store.commit('increment',payload)
mutations: {
  increment (state,payload) {
    // 变更状态
    state.count++
  }
}
```

# Action

Mutation 必须是同步的  
action 包装了以下 mutation,可以执行异步代码,里面对 state 状态改变通过 mutation

# module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

```
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
