# Provide
react的context组件  
当store值变化的时候更新所有消费者

```
this.state = {
  store,
  subscription
}

<Context.Provider value={this.state}>
  {this.props.children}
</Context.Provider>
```