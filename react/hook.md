# useState
```
const [state, setState] = useState(initialState);
```
initialState可以是值或者函数,只会在初次调用时加载  
state保存值  
setState用来改变值,类似setState,传入一个新的值替代老的state或者传入一个函数返回一个新值替代.
# useEffect