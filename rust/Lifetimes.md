# Lifetimes

every reference in Rust has a lifetime.

## Lifetime Annotation Syntax

```rs
&i32        // a reference
&'a i32     // a reference with an explicit lifetime
&'a mut i32 // a mutable reference with an explicit lifetime
```

## Lifetime Elision

在早期 rust 中,都需要 annoction 生命周期,不然会编译不通过  
在大量编写代码后,将发现了一些固定的 pattern,检查器会默认使用这些 pattern

Lifetimes on function or method parameters are called _**input lifetimes**_, and lifetimes on return values are called _**output lifetimes**_.

1. The first rule is that each parameter that is a reference gets its own lifetime parameter
2. The second rule is if there is exactly one input lifetime parameter, that lifetime is assigned to all output lifetime parameters: fn foo<'a>(x: &'a i32) -> &'a i32.
3. The third rule is if there are multiple input lifetime parameters, but one of them is &self or &mut self because this is a method, the lifetime of self is assigned to all output lifetime parameters.

## 手动声明

同一个生命周期,会取最小的作为生命周期的结构

1. 函数内注解

   ```rs
   //返回值的生命周期为入参两个中的较小值
   fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
       if x.len() > y.len() {
           x
       } else {
           y
       }
   }
   ```

2. 结构体中的注解

   ```rs
   //结构体的生命周期等于其值
   struct ImportantExcerpt<'a> {
     part: &'a str,
   }

   fn main() {
     let novel = String::from("Call me Ishmael. Some years ago...");
     let first_sentence = novel.split('.').next().expect("Could not find a '.'");
     //i在novel有效的时候都有效
     let i = ImportantExcerpt {
         part: first_sentence,
     };

     //例子1
     //发生move导致first_sentence无效了
     //let _a = novel;
     //打印i就会报错
     //println!("{:#?}", i);
   }
   ```

3. 方法

   ```rs
   //impl声明了一个'a(与泛型类似),可以在方法内使用了,省略的话按照Lifetime Elision来
   impl<'a> ImportantExcerpt<'a> {
       fn level(&self) -> i32 {
           3
       }
   }
   ```
