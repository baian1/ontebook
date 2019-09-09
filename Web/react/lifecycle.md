# Mounting

- constructor()
- static getDerivedStateFromProps()
- render()
- componentDidMount()

# updating

- static getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()

# getDerivedStateFromProps

可以在 render 前修改 state

# getSnapshotBeforeUpdate

获取 props 的变化,并将其作为 componentDidUpdate 的第三个参数传入
