# contextType

通过设置 class 的静态属性,可以通过 this.context 访问  
大概是做了代理吧

```
const MyContext = React.createContext();

class MyClass extends React.Component {
  static contextType = MyContext;
  componentDidMount() {
    let value = this.context;
    /* perform a side-effect at mount using the value of MyContext */
  }
}
```
