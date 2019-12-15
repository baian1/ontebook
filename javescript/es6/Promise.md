# Promise

## Promise.all

所有实例都完成后才会继续

## Promise.race

一旦迭代器中的某个 promise 解决或拒绝，就会开始往下执行

## Promise.allSettled

所有的 promise 都被解决或拒绝后，开始执行 then

## Promise and brower event

deffirent between js click and mouse click

```js
const nextClick = new Promise(resolve => {
  link.addEventListener("click", resolve, { once: true });
});

next.then(event => {
  event.preventDefault();
});
```

事件执行机制

如果是 process a link click:

1. 创建一个 click eventObject

2. 执行每一个有 click listener 的回调,这里会调用微队列的 preventDefault

3. 执行完回调后,通过判断*canceled flag*来判断是否触发 link,这个标识在上一步的微队列内,执行改变了

如果是 click()

点击后,在所有事件执行完毕返回前,不会进入微队列,在第二步执行完毕后的第三步判断,*canceled flag*会是 unset,默认事件不会被阻止
