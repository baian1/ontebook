# 字段赋值

```
class Test {
  test:number:5
}
=====
class Test {
  constrtuct(){
    this.test = 5;
  }
}
```

字段赋值的时候，如果有继承 class 会自动调用 constrtuct 进行初始化

# 继承

```
class B extends A{}
```

原型链继承原型链，继承父的方法

```
B.prototype=Object.create(A.prototype)
B.prototype.construct=B
```

在 ES7 中又推出了 static,那么继承的时候也需要继承静态属性

```
B.__protot__=A
```

# super

1. construct 中相当于把 this 传递给父类的 construcr 执行,把属性附加到上面
2. 方法中 super 指向父的原型链
3. static 中 super 指向父类
