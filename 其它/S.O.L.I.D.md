# Single-responsibility Principle

单一责任原则,表示一个类只干一件事,明确其责任

# Open-closed Principle

一个类无需修改类本身代码就可以轻松扩展

例子:
将在类中计算的东西抽出来,放到传入的类中,直接调用传入类的方法

```
//一个sum方法，可以添加输入类的属性，但要根据类的不同采用不同方法
public sum() {
  let area=0
  for(let shape of this.shapes) {
    if(shape instanceof Square)) {
      area = pow(shape.length, 2);
    } else if(shape instanceof Circle)) {
      area = pi() * Math.pow(shape.radius, 2);
    }
  }

  return array_sum($area);
}

//每当我们需要添加新的类的时候我们就需要修改代码添加if else块
//我们可以将这块计算放到 相关的类内 我们直接调用类的方法方法

//定义一个interface,必须有我们需要的方法
interface ShapeInterface {
  public function area();
}

class Circle implements ShapeInterface {
    public $radius;

    public function __construct($radius) {
        $this->radius = $radius;
    }

    public function area() {
        return pi() * pow($this->radius, 2);
    }
}

//使用
public sum() {
  let area=0
  for(let shape of this.shapes) {
    //直接调用方法
    area = shape.area()
  }

  return array_sum($area);
}
```

# Liskov substitution principle

子类可以扩展父类的功能，但不能改变父类原有的功能。

继承的时候需要遵循的原则，可以添加自己私有的类，实现父类抽象方法，重载的时候需要注意，需要按照父类规范来

# Interface segregation principle

合理地设计接口，不强迫 client 实现不需要地方法或属性，将 client 可能不需要的接口进行拆分，创建一个新的接口

# Dependency Inversion principle

依赖于抽象的接口而不是具体的实例，只要我们的实例实现我们的接口，在切换需要的实力的时候，我们就不修改修改类

例子:  
使用数据库的时候，我们可能会使用不一样的数据库，如果我们强依赖某一种数据库，当我们切换数据库的时候就需要修改相关类，违反了 OCP 原则。  
如果我们的类依赖的是接口，那只要我们传入的实例满足接口就行，不需要对类进行修改。
