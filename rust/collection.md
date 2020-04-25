# collection

## vectors

类似于其它语言中的数组,在内存中连续,有 push,remove,pop 等方法

1. 访问  
   访问元素时可以使用`v[1]`或`v.get(1)`,直接访问下标时如果超出 capacity 程序会崩溃
2. 创建
   - `Vec::new()`
   - `vec![1,2,3]`
3. 遍历

   ```rs
   for i in &mut v {
     *i += 50;
   }
   ```

4. 存储多种类型,Vec 只能存储一种类型的数据,借助 enum 可以存储多种类型的数据

## String

rust 中的字符都是以 unt-8 表示的 unicode 字符  
rust 核心库实现了 str 类型

1. 遍历

   ```rs
   for c in "नमस्ते".chars() {
     println!("{}", c);
   }

   for b in "नमस्ते".bytes() {
     println!("{}", b);
   }
   ```

2. 复杂的组合`format!("{}-{}-{}", s1, s2, s3);`

## HashMap

其它语言中也叫做 hash, map, object, hash table, dictionary, or associative array.

```rs
use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);
scores.get("Blue").unwrap();
```

---

所有权`scores.insert`调用的时候,简单类型 cpoy,堆内 move

---

更新

1. 调用 insert 覆盖
2. `entry`返回一个枚举 Entry

   - 在没有值的情况下覆盖 `scores.entry(String::from("Yellow")).or_insert(50)`
   - 根据旧值更新

   ```rs
   let count = map.entry(word).or_insert(0);
   *count += 1;
   ```
