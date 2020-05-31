# test

给函数加上`#[test]` annotation 表示这是一个测试函数,在执行`cargo run test`的时候回运行

## test 函数编写

### 输出解释

assert!的第二个与第三个参数可以在失败的时候有解释性说明
`assert!( result.contains("Carol"), "Greeting did not contain name, value was`{}`", result );`

### should_panic

`#[should_panic]` 用于表示函数内需要有 panic 才是通过的
`#[should_panic(expected = "xxx")]`表示期望 panic 是抛出的字符

### Result

可以通过测试函数返回 Result 表示函数执行是否成功

## Controlling

1. 设置使用线程,可以实现串行测试 `cargo test -- --test-threads=1`
2. 显示测试过程中 print!,只有失败的测试才会打印`cargo test -- --show-output`
3. 测试部分函数,通过函数名来匹配 `cargo test one_hundred`
4. `#[ignore]`注解可以忽视 test 执行,除非使用`cargo test -- --ignored`

## Test Organization

1. 单元测试 用于测试一个个函数小模块的功能,`#[cfg(test)]`注解使一个模块内的单元测试代码不会被编译出去
2. 集成测试 用于测试整个包的功能 需要在根目录下创建`tests`文件夹

   ```rs
   //引入包进行测试
   use adder;

   #[test]
   fn it_adds_two() {
       assert_eq!(4, adder::add_two(2));
   }
   ```

   tests 下的每一个文件都将被当作测试模块,进行编译测试,可以使用文件夹来表示她是工具类,不进行测试,引用的时候才会编辑
