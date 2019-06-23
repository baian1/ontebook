# History
每一个选项卡开启的时候都会创建一个history对象,保存这个选项卡里的地址变化信息

## 属性
- History.length  
当前选项卡,会话历史中的元素个数
- History.state  
保存页面切换的时候传入的数据,不会被重置,除非记录被改变  
在刷新或者后退前进时会重新加载该数据
## 方法
- 向前和向后,与用户操作等价  
  ```
  window.history.back();
  window.history.forward();
  ```

- 跳到history中的指定点
  ```
  window.history.go(-1);
  ```
  参数表示要跳转到的点相对与当前位置的坐标

- 添加或修改历史记录中的条目  
  pushState()  
  参数:
  1. 状态对象,保存在history的state中,每当页面被加载时加载,最大为640k
  2. 标题,目前被忽略
  3. URL,必须同源,可以是相对地址或绝对地址  

  replaceState()  
  参数与pushState()类似,效果是替换history栈中的当前位置的节点 
## 事件
popstate  
history.pushState()或history.replaceState()不会触发popstate事件  
只有在浏览器操作的时候才会触发,用js的history.back()或history.go()也会触发