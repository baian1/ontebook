# Height equal to dynamic width

可以通过设置 padding-bottom 或者 margin-top 为百分比,来控制元素的长宽比例

```
//HTML
<div id="container">
    <div id="dummy"></div>
    <div id="element">
        some text
    </div>
</div>

//CSS

//父元素设置宽度
#container {
    display: inline-block;
    position: relative;
    width: 50%;
}
//继承父元素宽度,并设置高度
#dummy {
    margin-top: 75%; /* 4:3 aspect ratio */
}
//绝对定位，添加元素到父元素范围内
#element {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: silver /* show me! */
}
```
