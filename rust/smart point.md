# smart point

## box

- When you have a type whose size can’t be known at compile time and you want to use a value of that type in a context that requires an exact size
- When you have a large amount of data and you want to transfer ownership but ensure the data won’t be copied when you do so
- When you want to own a value and you care only that it’s a type that implements a particular trait rather than being of a specific type  

-----------------

递归结构,rust在编译的时候需要确定结构体的大小,而递归结构会无限大.

```rs
enum List {
    Cons(i32, List),
    Nil,
}```
Cons里带List会无线套娃,导致大小过大

使用Box将List变为指针可以实现递归结构
```rs
enum List {
    Cons(i32, Box<List>),
    Nil,
}
```

想要获取Box的值需要调用*符号

## 指针

1. Rc 计数指针,强引用,每clone一次加一

    ```rs
    Rc::new()
    Rc::clone()
    ```

2. RefCell 可变数据

    ```rs
    let ref_1 = RefCell.new(2);
    //ref_1.brrow_mut会获取一个MutRef类型
    //实现了defer,返回一个可变变量
    *ref_1.borrow_mut() += 1;
    ```

3. Weak 弱引用

    ```rs
    let root = Weak::new();
    //返回option值 weak不一定还存在
    root.upgrade();
    //返回一个弱引用
    Rc::downgrade();
    ```
