# Generator
Generator是一个特殊的函数，函数体内部使用yield表达式，定义不同的内部状态，当执行Generator函数时，不会直接执行函数体，而是会返回一个遍历器对象（iterator）。
```
function* generator() {
    console.log('start');
    yield 1
    yield 2
    yield 3
    console.log('end')
}
```
使用
```
const iterator = generator() // 这时函数体并没有被执行，而是创建了一个iterator
// 当调用iterator的next方法时，函数体开始执行，
iterator.next() // 'start'  {value: 1, done: false}
iterator.next() // {value: 2, done: false}
iterator.next() // {value: 3, done: false}
iterator.next() // 'end'   {value: undefined, done: true}
```
## next
yield表达式本身没有返回值，或者说总是返回undefined。  
next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。

## throw
throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。
## return
可以返回给定的值，并且终结遍历 Generator 函数。  
如果 Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return方法会推迟到finally代码块执行完再执行。
## yield*
```
function* foo() {
  yield 'a';
  yield 'b';
}
```
yield函数相当于
```
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}
```
```
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}
```

## asyncgenerator
```
async function*() {
  yield "hello";
  yield "async";
  yield "iteration!";
};
```