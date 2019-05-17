# engine

```
let activeInstances = [];
let pausedInstances = [];
let raf;
```
设定引擎需要用到的一些参数为全局参数

activeInstances用来存储运动的例子  
pausedInstances用来存储停止的例子
raf用于存储requestAnimationFrame返回的ID

```
//返回play()用于启动运动，不断调用自己
const engine = (() => {
  function play() { 
    raf = requestAnimationFrame(step);
    console.log(raf);
  }
  function step(t) {
    let activeInstancesLength = activeInstances.length;
    if (activeInstancesLength) {
      let i = 0;
      while (i < activeInstancesLength) {
        const activeInstance = activeInstances[i];
        if (!activeInstance.paused) {
          activeInstance.tick(t);//画下一帧
        } else {
          const instanceIndex = activeInstances.indexOf(activeInstance);//停止的运动需要去除
          if (instanceIndex > -1) {
            activeInstances.splice(instanceIndex, 1);
            activeInstancesLength = activeInstances.length;
          }
        }
        i++;
      }
      play();
    } else {
      raf = cancelAnimationFrame(raf);
    }
  }
  return play;
})();
```