# iterator
一个特殊的对象,有一个next方法,next返回一个对象包含value和done
```
//传入一个数组或者对象创建iterator
const createIterator = items => {
  const keys = Object.keys(items)
  const len = keys.length
  let pointer = 0
  return {
    next() {
      const done = pointer >= len
      const value = !done ? items[keys[pointer++]] : undefined
      return {
        value,
        done
      }
    }
  }
}
```
## iterator和for...of
有Symbol.iterator方法的对象可以用for...of迭代

# asyncIterator
```
const myAsyncIterable = new Object();
myAsyncIterable[Symbol.asyncIterator] = async function*() {
  yield "hello";
  yield "async";
  yield "iteration!";
};

(async () => {
  for await (const x of myAsyncIterable) {
    console.log(x);
    // expected output:
    //    "hello"
    //    "async"
    //    "iteration!"
  }
})();
```