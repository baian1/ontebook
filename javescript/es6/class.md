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
字段赋值的时候，如果有继承class会自动调用super进行初始化