# 变量
可以定义一个变量调用
```
@width: 10px;
@height: @width + 10px;
```

```
@min768: (min-width: 768px);
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
```

# mixins
```
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
#menu a {
  color: #111;
  .bordered();
}

```

# 嵌套
```
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```
其中可以使用&表示父级  
@media (min-width: 768px)嵌套会将@media提取到最外层输出

# 操作符
可以在less中使用+, -, *, /运算符号

# function
有很多自带函数可以使用

# Namespaces and Accessors
```
#bundle() {
  .button {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover {
      background-color: white;
    }
  }
  .tab { ... }
  .citation { ... }
}
```
用一个bundle包很多经常调用的  
使用:#bundle.tab()

# Maps
```
#colors() {
  primary: blue;
  secondary: green;
}

.button {
  color: #colors[primary];
  border: 1px solid #colors[secondary];
}
```

# 文件导入
@import "library"; // library.less
@import "typo.css";

# ~
任意字符串保持原意
```
@min768: ~"(min-width: 768px)";
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}

@media (min-width: 768px) {
  .element {
    font-size: 1.2rem;
  }
}
```
3.4以上版本可以省略~和"",能正常识别