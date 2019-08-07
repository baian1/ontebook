# 原理
hooks是使用了链表保存的  

# useState
```
const [state, setState] = useState(initialState);
```
initialState可以是值或者函数,只会在初次调用时加载  
state保存值  
setState用来改变值,类似setState,传入参数
- 一个新的值替代老的state  
- 一个具有返回值的函数

默认值是简单的赋值,所以对象赋值就会是一个相同的对象,操作会对对象入参有影响  
可以通过第三个参数,初始化默认值函数,输入初始化参数返回初始值的函数，来解决

更新的时候如果单纯改变了对象的值,返回的对象地址没有改变,那么比较后react判断没有更新,就不会触发更新
# useReducer
# useEffect
