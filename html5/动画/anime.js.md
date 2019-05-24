# 选择元素
css选择器  
dom node/nodelist  
js对象  

可以是数组形势，选择多个对象

# 改变属性
- css基本的背景颜色，位置等属性
- css形状变化属性
- boject属性值改变
- dom attributes
- svg属性

# 属性值 参数
表示改变过程中怎么做
- DURATION 持续时间
- delay 动作开始延迟
- delayend 动作结束延迟
- esing 属性按什么函数变化 线性/
- round 动画值舍入  **？？？**

- FUNCTION BASED 
他们的属性可以是函数
传入三个参数
|ARGUMENTS      |INFOS|
|---------------|-----|
|target         |The curent animated targeted element
|index	        |The index of the animated targeted element
|targetsLength	|The total number of animated targets

- object
value就是上面的值  
然后还可以有延迟，运动轨迹，延迟参数  
具体见源码部分,normalizePropertyTweens
# 动画参数
- direction 方向
- loop true一直循环,数字则为循环次数
- autoplay 

# value
- unitless 会自动补全单位
- SPECIFIC UNIT 强制目前单位属性转换为输入单位
- RELATIVE '+='|'-='|'*=' 在原本的基础上进行运算
- color Haxadecimal|RGB|RGBA|HSL|HSLA
- FROM TO 强制动画起点  
  translateX: [100, 250], // from 100 to 250
- FUNCTION BASED VALUES 三个参数与上面一致
- object 一些动画参数
```
width: {
  value: '-=20px', // 28 - 20 = '8px'
  duration: 1800,
  easing: 'easeInOutSine'
},
```

# keyframes
- ANIMATION KEYFRAMES
```
keyframes: [
    {translateY: -40},
    {translateX: 250},
    {translateY: 40},
    {translateX: 0},
    {translateY: 0}
],
```
- PROPERTY KEYFRAMES
```
translateY: [
    { value: -40, duration: 500 },
    { value: 40, duration: 500, delay: 1000 },
    { value: 0, duration: 500, delay: 1000 }
  ],
```

# STAG
使用function属性实现  
- anime.stagger(value, options)  

同时操作多个元素
base 延迟
```
delay: anime.stagger(100) 
```
延迟加时间
```
delay: anime.stagger(100, {start: 500}) // delay starts at 500ms then increase by 100ms for each elements.
```

- anime.stagger([startValue, endValue])
```
rotate: anime.stagger([-360, 360]), // rotation will be distributed from -360deg to 360deg evenly between all elements
```

- anime.stagger(value, {from: startingPosition})  
from字段控制是从哪个元素开始

- anime.stagger(value, {direction: 'reverse'})  
direction控制从哪个元素开始

- anime.stagger(value, {easing: 'easingName'})  
可以使用内置动画或者提供动画轨迹函数

- anime.stagger(value, {grid: [rows, columns]})
二维，指定元素行列

- anime.stagger(value, {grid: [rows, columns], axis: 'x'})
axis控制变换方向

# TIMELINE
线性控制一个接一个
```
var tl = anime.timeline({
  targets: '.params-inheritance-demo .el',
  delay: function(el, i) { return i * 200 },
  duration: 500,
  easing: 'easeOutExpo',
  direction: 'alternate',
  loop: true
});//规定动画相关参数

tl
.add({
  translateX: 250,
  // override the easing parameter
  easing: 'spring',
},'-=100')//规定变化属性， 延迟参数:数字或者'-=100'相对值
.add({
  opacity: .5,
  scale: 2
})
.add({
  // override the targets parameter
  targets: '.params-inheritance-demo .el.triangle',
  rotate: 180
})
.add({
  translateX: 0,
  scale: 1
});
```

# callback
在函数运行过程中会根据时间调用  
传入参数anim  
- UPDATE
- BEGIN & COMPLETE
- LOOPBEGIN & LOOPCOMPLETE
- CHANG
- CHANGEBEGIN & CHANGECOMPLETE
- FINISHED PROMISE

# EASINGS
- line
- cubicBezier
- spring
- Elastic
- steps
- 自定义函数

# animal函数控制
- remove
- get
- set
- random
- tick
- running 活动对象数组

# SVG
- MOTION PATH 根据路径返回一个函数，这个函数根据属性返回对应函数
- points 所有形状都具有完全相同数量的节点
- strokeDashoffset 线条动画 svg有个虚线长度设置和虚线长度偏移设置,利用其原理实现了动画效果