# Ownership

数据的存储有两个地方,堆和栈

block 中声明的变量会在 scope 范围之外失效,拥有内存的变量超出范围后,内存将自动返回。

```rs
{
    let s = String::from("hello"); // s is valid from this point forward

    // do stuff with s
}   // this scope is now over, and s is no longer valid
```

当变量超出 scope 后,rust 会调用一个特殊的函数`drop`将内存返还给系统

## move and clone

堆数据

1. move,相当于浅复制  
   放在堆内的变量,赋值给其它变量事,原来的变量就会失效,这是为了防止我们多次释放同一块内存产生错误

   ```rs
   {
     let s1 = String::from("hello");
     let s2 = s1;//s1 失效
   }
   ```

2. clone  
   有时候我们需要赋值一个堆上的内容的时候,基本采用 clone 方法来显示地复制,这样会提示我们该操作是昂贵的

---

栈数据

栈内数据的相互赋值,采用的是复制的方式,因为大小都是已知的,并且存在栈上,浅复制和深复制没有差别

## 函数

当一个堆变量作为函数的参数,将会执行 move 操作,原来的堆变量将会无效

## References and Borrowing

1. reference `&` 这个符号可以创建一个引用
2. 可变引用 `&mut`

- 引用可以有多个
- 可变引用只能有一个,防止 data race:
  1. Two or more pointers access the same data at the same time.
  2. At least one of the pointers is being used to write to the data.
  3. There’s no mechanism being used to synchronize access to the data.
- 可变引用与引用的范围不能重合

---

引用的范围是创建引用到最后一次使用

## slice type

考虑一个场景

```rs
fn main() {
    let mut s = String::from("hello world");

    let word = first_word(&s); // word will get the value 5

    s.clear(); // this empties the String, making it equal to ""

    // word still has the value 5 here, but there's no more string that
    // we could meaningfully use the value 5 with. word is now totally invalid!
}
```

获取到的 word 下标与 s 是没有关联的,当 s 改变后 word 依旧是 5,会发生逻辑错误

这时候可以通过创建 slice 进行关联

```rs
let s = String::from("hello world");

let hello = &s[0..5];
```

切片会创建一个 immutable borrow
