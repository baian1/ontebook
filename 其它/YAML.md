# 基本格式要求

1. YAML 大小写敏感；
2. 使用缩进代表层级关系；
3. 缩进只能使用空格，不能使用 TAB，不要求空格个数，只需要相同层级左对齐（一般 2 个或 4 个空格）

# 对象

```
key: value

#缩进表示层级关系
key:
    child-key: value
    child-key2: value2
```

# 数组

```
#[Java,LOL]
hobby:
    - Java
    - LOL

#[[{id:1,name:company1,price: 200W}]]
companies:
    -
        id: 1
        name: company1
        price: 200W
```

# 常量

```
boolean:
    - TRUE  #true,True都可以
    - FALSE  #false，False都可以
float:
    - 3.14
    - 6.8523015e+5  #可以使用科学计数法
int:
    - 123
    - 0b1010_0111_0100_1010_1110    #二进制表示
null:
    nodeName: 'node'
    parent: ~  #使用~表示null
string:
    - 哈哈
    - 'Hello world'  #可以使用双引号或者单引号包裹特殊字符
    - newline
      newline2    #字符串可以拆成多行，每一行会被转化成一个空格
date:
    - 2018-02-17    #日期必须使用ISO 8601格式，即yyyy-MM-dd
datetime:
    -  2018-02-17T15:02:31+08:00    #时间使用ISO 8601格式，时间和日期之间使用T连接，最后使用+代表时区
```

# 特殊符号

1. \---与\... 一个文件中的配置文档的开始与结束

```
---
time: 20:03:20
player: Sammy Sosa
action: strike (miss)
...
---
time: 20:03:47
player: Sammy Sosa
action: grand slam
...
```

2. 折叠换行与保留换行

```
accomplishment: >
 Mark set a major league
 home run record in 1998.

accomplishment=Mark set a major league home run record in 1998.
```

```
stats: |
 65 Home Runs
 0.278 Batting Average

stats=65 Home Runs
0.278 Batting Average,
```

3. 引用

```
hr:
- Mark McGwire
- &SS Sammy Sosa #设置引用
rbi:
- *SS #使用引用
- Ken Griffey
```

4. 合并

```
merge:
  - &CENTER { x: 1, y: 2 }
  - &LEFT { x: 0, y: 2 }
  - &BIG { r: 10 }
  - &SMALL { r: 1 }

#sample1={r=10, y=2, x=1}
sample1:
    <<: *CENTER
    r: 10

#sample2={other=haha, x=1, y=2, r=10}
sample2:
    << : [ *CENTER, *BIG ]
    other: haha

#sample3={r=100, y=2, x=1}
sample3:
    << : [ *CENTER, *BIG ]
    r: 100
```
