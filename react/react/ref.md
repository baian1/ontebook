# ref
1. 创建一个ref
2. 通过给render的jsx设置ref属性,可以将节点挂到ref.current上
```
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：我们通过 "current" 来访问 DOM 节点
    this.textInput.current.focus();
  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到
    // 构造器里创建的 `textInput` 上
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />

        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

回调ref
1. 设置ref的值为函数element => {this.textInput = element;};
2. 通过将入参element绑定到变量上来访问dom节点

# ref转发
将 ref 自动地通过组件传递到其一子组件  
ref是处理过的特殊参数,不在props中,
如果需要传递ref,使用React.forwardRef((props, ref)=>{})获取ref,然后将ref换个名字传递到props中,获取ref绑定到ref上

## 函数组件
```
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```