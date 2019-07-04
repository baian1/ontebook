# 元素选择
- 鼠标右键的检查(inspect)
- DevTools的Select an element按钮(左上角)
- DevTools的dom tree中直接选择
- 在console中输入指令查询出结点，然后右键Reveal in Elements panel选中元素

# 样式查看
伪类选择可以使元素的状态改变

# 改变样式
1. 通过修改内联样式改变
2. 修改已有的类
3. 添加新的类,使用+符号，想要选择合适位置添加可以在类的右小角使用+

# print mode
打印模式的页面
1. 进入run command
2. 输入指令show rendering
3. emulate css media选择print模式

# 查看css使用与未使用状况
1. 进入run command(Control+Shift+P)
2. Show Coverage
3. 点击开始就会收集页面使用的js,css信息并标注 使用与未使用的标识

# css animation
1. 进入run command(Control+Shift+P)
2. Show animation  

动画检查器支持 CSS 动画、CSS 过渡和网络动画。当前不支持 requestAnimationFrame 动画。