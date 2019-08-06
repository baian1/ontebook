# 创建组件
```
//全局注册 到处都能用
Vue.component('button-counter', {
  //一个函数返回object,使每个组件实例都有独子的object
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

//本地注册
//组件就是简单的js对象
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }
var ComponentC = { /* ... */ }
//在需要用到的地方注册下,就能用了
new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
//note：本地注册的组件想要在子组件中使用,需要在子组件中添加
var ComponentB = {
  components: {
    'component-a': ComponentA
  },
  // ...
}
```

## 全局注册组件
```
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // The relative path of the components folder
  './components',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )


  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})
```

# 组件传值
未被添加的属性将自动添加到根元素上
```
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})

<blog-post title="My journey with Vue"></blog-post>
```

## 静态传值与动态传值
静态直接添加attribute，动态加上v-bind

## 参数类型
- number
- array
- object
  - 对象属性用v-bind:prop-name，这样会把对象的一个个属性拆开分配上去
  - 传递对象用v-bind:author="post.author"
- boolean

## props类型校验
可以设置props为对象，能验证类型
- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Symbol
```
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
```

## 禁用属性继承
不希望组件的根元素继承属性
```
Vue.component('my-component', {
  inheritAttrs: false,
  // ...
})
```
使用$attrs可以将属性转发
## 组件值替换
对大多数attribute而言,组件上和模板上有同名的属性,用组建的时候的属性优先级较高

对于class和style则会进行组合

# 事件传递
```
//父
<blog-post
  ...
  v-on:enlarge-text="postFontSize += 0.1"
></blog-post>
//子
<button v-on:click="$emit('enlarge-text')">
  Enlarge text
</button>

//传递事件参数
<blog-post
  ...
  v-on:enlarge-text="postFontSize += $event"
></blog-post>
<button v-on:click="$emit('enlarge-text', 0.1)">
  Enlarge text
</button>

//方法
<blog-post
  ...
  v-on:enlarge-text="onEnlargeText"
></blog-post>
methods: {
  onEnlargeText: function (enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```

## 绑定原生事件
```
//直接绑定事件到根元素
<base-input v-on:focus.native="onFocus"></base-input>
```

将所有父组件事件绑定到子组件上
```
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function () {
      var vm = this
      // `Object.assign` merges objects together to form a new object
      return Object.assign({},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `
})
```

## sync修改
```
//子组件触发事件
this.$emit('update:title', newTitle)
```
```
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
//简写为
<text-document v-bind:title.sync="doc.title"></text-document>
```

# slot
类似react的children,可以传递html模板  
子组件可以设置默认内容,假如父组件没有写内容,显示默认值

## 命名插槽
```
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>
  //默认slot等价于
  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

# Dynamic Components
```
//展示is对应名字的组件
//或者直接传递一个组件,带template的那种对象
<component v-bind:is="currentTabComponent"></component>
```
## keep-alive 与 Dynamic Components
```
//这样会缓存componengt,不会每次新建和删除
<!-- Inactive components will be cached! -->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

## Async Components
在创建组件的第二个参数传入函数
```
//一秒后渲染该组件
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // Pass the component definition to the resolve callback
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```

```
Vue.component('async-webpack-example', function (resolve) {
  // This special require syntax will instruct Webpack to
  // automatically split your built code into bundles which
  // are loaded over Ajax requests.
  require(['./my-async-component'], resolve)
})
Vue.component(
  'async-webpack-example',
  // The `import` function returns a Promise.
  () => import('./my-async-component')
)
```

```
Local Registration
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```

如果要对异步加载的时候的过程显示一些其他的东西
```
const AsyncComponent = () => ({
  // The component to load (should be a Promise)
  component: import('./MyComponent.vue'),
  // A component to use while the async component is loading
  loading: LoadingComponent,
  // A component to use if the load fails
  error: ErrorComponent,
  // Delay before showing the loading component. Default: 200ms.
  delay: 200,
  // The error component will be displayed if a timeout is
  // provided and exceeded. Default: Infinity.
  timeout: 3000
})
```