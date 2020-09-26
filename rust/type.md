# type

## 类型重命名

1. 偶尔一些类型定义比较长,书写困难,可以使用`type Box_A=Result<Box<i32>,&str>`
2. 如果一个类型和特征都是由外部导入的,我们可以通过type重新命名后应用特征

## 永不返回的类型

1. match中的continue,match返回必须是一个类型,如果有类型是 continue,表示会跳过这个循环  
   返回类型就是!,!表示后面代码块的都不会被触发运行了
   返回类型中有 i32和!,那结果就是 i32

    ```rs
   let guess: u32 = match guess.trim().parse() {
           Ok(num) => num,
           Err(_) => continue,
       };
   ```

## Dynamically Sized Types and the Sized Trait

一般基础的类型都是有固定大小的

动态大小:

1. str 每一个都是不一样的长度

    ```rs
        let s1: str = "Hello there!";
        let s2: str = "How's it going?";
    ```

2. 特征作为类型时,由于实现特征的对象是不同的,所以类型大小也是不确定的,用dyn表示,Box的泛型T有?Size特征

    ```rs
    let box11: Box<dyn Display> = Box::new("display 特征作为类型");
    println!("{}", box11.as_ref().to_string());
    ```

## 泛型默认值

```rs
//结构体
//配合特征时可以指默认类型
//impl Add for A{}
//这个Add就是A<i32>实现
//虽然没有什么用
struct A<T=i32>{
    num:T
}
//特征
trait Add<Rhs=Self> {
    type Output;

    fn add(self, rhs: Rhs) -> Self::Output;
}
```
