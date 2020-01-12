# Reflection

利用 unsafe 突破了类型限制

## 方法

- Type 用来检测其类型

## [unsafe.point](https://golang.org/pkg/unsafe/)

uintptr 能够储存指针的整型,指向指针地址,可以进行地址运算

- Sizeof 查看所占内存
- Alignof 查看对齐方式
- Offsetof 查看结构体开始地址的偏移地址

- Pointer 将一个地址设为指针类型,用于转换不同的指针

  ```go
  f := 1.0
  pf := &f
  pi := (*int64)(unsafe.Pointer(pf))
  fmt.Printf("%d\n", *pi)     // 4607182418800017408
  *pi = 0
  fmt.Printf("%g\n", f)       // 0
  ```
