# router
constructor中history添加了监听器,当location变化的时候会刷新state

一个Context.Provider  
value:
- history 用于操作地址变化
- location 地址信息
- match 根目录path

# StaticRouter
不会随着用户操作导致url改变而重新渲染的页面  
提供api操作其改变location

# route
props中传入了context内容,还有就是props上的location和computeMatch
按照文档我们有三种传入组件
- children  如果是函数就返回children(props)
- component React.createElement(component, props)
- render render(props)

```
<RouterContext.Provider value={props}>
  //children不受影响
  {children && !isEmptyChildren(children)
    ? children
    //component和render都收match影响
    : props.match
      ? component
        ? React.createElement(component, props)
        : render
          ? render(props)
          : null
      : null}
</RouterContext.Provider>
```
这里我们可以看出这里有context，我们可以直接通过context获取history,location等

# switch
```
//遍历子组件,在没有匹配到路由的时候会一直是下一个element
React.Children.forEach(this.props.children, child => {
  if (match == null && React.isValidElement(child)) {
    element = child;

    const path = child.props.path || child.props.from;

    match = path
      ? matchPath(location.pathname, { ...child.props, path })
      : context.match;
  }
});

//有匹配到返回合适element,没有匹配到返回null
return match
  ? React.cloneElement(element, { location, computedMatch: match })
  : null;
```

# withRouter
一个HOC
```
<RouterContext.Consumer>
  {context => {
    invariant(
      context,
      `You should not use <${displayName} /> outside a <Router>`
    );
    return (
      <Component
        {...remainingProps}
        //这里将history等附到了上面
        {...context}
        ref={wrappedComponentRef}
      />
    );
  }}
</RouterContext.Consumer>
```
最后返回 hoistStatics(C, Component)继承静态属性

# matchPath
匹配url和组件地址，来确认是否返回组件
使用了path-to-regexp组件
```
//构建用来匹配的regexp
function compilePath(path, options) {
  const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
  const pathCache = cache[cacheKey] || (cache[cacheKey] = {});

  if (pathCache[path]) return pathCache[path];

  const keys = [];
  const regexp = pathToRegexp(path, keys, options);
  const result = { regexp, keys };

  if (cacheCount < cacheLimit) {
    pathCache[path] = result;
    cacheCount++;
  }

  return result;
}
```
```
const { regexp, keys } = compilePath(path, {
  end: exact,
  strict,
  sensitive
});
const match = regexp.exec(pathname);

if (!match) return null;

const [url, ...values] = match;
const isExact = pathname === url;

if (exact && !isExact) return null;

return {
  path, // the path used to match
  url: path === "/" && url === "" ? "/" : url, // the matched portion of the URL
  isExact, // whether or not we matched exactly
  //将:id这种参数添加到到params中,名字保存在key中,值保存在匹配结果中
  params: keys.reduce((memo, key, index) => {
    memo[key.name] = values[index];
    return memo;
  }, {})
};
```