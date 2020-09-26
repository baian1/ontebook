# match

rust 中的patterns

```rs
let PATTERN = EXPRESSION;
```

可以使用元组或结构进行解构

元组：`let (x, y, z) = (1, 2, 3);`
结构：`let Point { x, y } = Point { x: 3, y: -10 }`

## 匹配规则

1. 元组数量必须一致
2. 结构体必须一致

## 忽略规则

使用`_`可以忽略解构不需要知道的值,  
忽略大量值使用`..`,比如`Point { x, .. }`

## match匹配多种用法

1. `1 | 2`
2. ..= 比如`1..=6`,`'a'..='c'`

## Extra Conditionals with Match Guards

`Some(x) if x < 5` 如果是|多个匹配的, 条件语句只能放在最后

## @ Bindings

比如使用了范围匹配,但是我们还需要获取这个匹配的变量时

```rs
match msg {
    Message::Hello {
        id: id_variable @ 3..=7,
    } => println!("Found an id in range: {}", id_variable),
    Message::Hello { id: 10..=12 } => {
        println!("Found an id in another range")
    }
    Message::Hello { id } => println!("Found some other id: {}", id),
}
```
