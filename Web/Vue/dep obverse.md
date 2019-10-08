# vue2.0

## dep

数据用的，用来收集依赖该数据的 watch，并通知其更新

## watcher

watcher 的创建有三种,render 创建，用户自定义 watch 创建,自定义 compute 创建

watcher 创建的时候会将 dep 类中的 static target 置为该 watch,在我们 get 数据时,会将该 watch 加入到该引用数据的 dep 中(以便在 set 数据时,会触发引用该数据的 watcher 更新)

## Observer

将数据对象转换为可观察对象,给每个数据都建立一个 dep,用来存储订阅该数据的 watcher

## 响应式流程

用 observer 建立可观察对象,对象的每个键带一个 dep,用来收集 watcher  
当数据改变的时候,触发 dep 里面所用订阅的 watcher 的更新函数
