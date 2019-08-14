# memo

class 组件可以使用 PureComponent 来进行浅比较,阻止更新  
现在函数组件也提供这个功能了

```
const MyComponent = React.memo(function MyComponent(props) {
  /* only rerenders if props change */
});
```

可以提供第二个参数,在里面进行比较,实现 shouldComponentUpdate

```
propsAreEqual?: (prevProps: Readonly<ComponentProps<T>>, nextProps: Readonly<ComponentProps<T>>) => boolean
```
