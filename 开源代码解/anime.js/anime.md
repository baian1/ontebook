# anime
参数params = {}  
这个函数用于创建一个instance，设置XXX

```
  let startTime = 0,//开始时间
  lastTime = 0,
  now = 0;
  let children, childrenLength = 0;
  let resolve = null;
```

## 运动
动画都是有时间帧的，这里根据时间，计算出时间帧
```
//startTime为一次运动开始时间
//t为页面时间
//相减后获得时间为运动消耗时间,也叫引擎运行时间
//根据时间设置属性
instance.tick = function(t) {
  now = t;
  if (!startTime) startTime = now;
  setInstanceProgress((now + (lastTime - startTime)) * anime.speed);
}

//这里直接输入运动消耗时间来渲染下一帧
instance.seek = function(time) {
  setInstanceProgress(adjustTime(time));
}
```

```
//运动还有一些其他参数,比如延迟，反向运动，这里计算出其真实在运动状态消耗时间然后使用setAnimationsProgress
function setInstanceProgress(engineTime) {
  const insDuration = instance.duration;//总时间
  const insDelay = instance.delay;//延迟时间
  const insEndDelay = insDuration - instance.endDelay;
  const insTime = adjustTime(engineTime);//运动消耗时间，这个函数是反向运动时取反向时间用的
  instance.progress = minMax((insTime / insDuration) * 100, 0, 100);//将运动时间转换为运动进度，Math.min(Math.max(val, min), max)，保证进度在0-100内
  instance.reversePlayback = insTime < instance.currentTime; //比较例子当前时间和消耗时间（下一次运动的位置时间），和子对象有关，具体作用未知
  if (children) { syncInstanceChildren(insTime); };//子元素同步运动
  if (!instance.began && instance.currentTime > 0) {
    instance.began = true;
    setCallback('begin');
    setCallback('loopBegin');
  }
  if (insTime <= insDelay && instance.currentTime !== 0) {
    setAnimationsProgress(0);
  }//延迟时间未到，乖乖不动
  if ((insTime >= insEndDelay && instance.currentTime !== insDuration) || !insDuration) {
    setAnimationsProgress(insDuration);
  }//结束延迟，超时保持在最后位置不动
  if (insTime > insDelay && insTime < insEndDelay) {
    if (!instance.changeBegan) {
      instance.changeBegan = true;
      instance.changeCompleted = false;
      setCallback('changeBegin');
    }
    setCallback('change');
    setAnimationsProgress(insTime);//刷新一帧
  } else {
    if (instance.changeBegan) {
      instance.changeCompleted = true;
      instance.changeBegan = false;
      setCallback('changeComplete');
    }
  }//根据消耗时间，判断运动是不是完成
  instance.currentTime = minMax(insTime, 0, insDuration);//之前刷新了一针，改变当前时间
  if (instance.began) setCallback('update');
  if (engineTime >= insDuration) {//表示一次运动结束
    lastTime = 0;
    countIteration();//循环剩余次数-1
    if (instance.remaining) {//存在重复运动
      startTime = now;//重设时间，新运动开始
      setCallback('loopComplete');
      setCallback('loopBegin');
      if (instance.direction === 'alternate') { toggleInstanceDirection(); }//运动反向，子对象属性变更和这个对象一样
    } else {
      instance.paused = true;//循环次数耗尽，运动停止了
      if (!instance.completed) {
        instance.completed = true;//完成运动
        setCallback('loopComplete');
        setCallback('complete');
        if (!instance.passThrough && 'Promise' in window) {
          resolve();
          promise = makePromise(instance);//表示运动状态的，设置之前的结束，开启新的一个状态，具体作用未知
        }
      }
    }
  }
}
```

```
//这个函数用于修改元素的属性
function setAnimationsProgress(insTime) {
  let i = 0;
  const animations = instance.animations;
  const animationsLength = animations.length;//遍历运动数组
  while (i < animationsLength) {
    const anim = animations[i];  //所有动作,一个个动作遍历
    const animatable = anim.animatable;
    const tweens = anim.tweens;
    const tweenLength = tweens.length - 1;
    let tween = tweens[tweenLength];
    // Only check for keyframes if there is more than one tween
    if (tweenLength) tween = filterArray(tweens, t => (insTime < t.end))[0] || tween;

    //根据时间计算出运动到整体的哪个阶段，进度条到哪儿了
    const elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
    const eased = isNaN(elapsed) ? 1 : tween.easing(elapsed);

    const strings = tween.to.strings;
    const round = tween.round;
    const numbers = [];
    const toNumbersLength = tween.to.numbers.length;
    let progress;
    for (let n = 0; n < toNumbersLength; n++) {
      let value;
      const toNumber = tween.to.numbers[n];
      const fromNumber = tween.from.numbers[n] || 0;
      if (!tween.isPath) {

        //根据进度条计算出实际位置
        value = fromNumber + (eased * (toNumber - fromNumber));
      } else {
        value = getPathProgress(tween.value, eased * toNumber);
      }
      if (round) {
        if (!(tween.isColor && n > 2)) {
          value = Math.round(value * round) / round;
        }
      }
      numbers.push(value);
    }
    // Manual Array.reduce for better performances
    const stringsLength = strings.length;
    if (!stringsLength) {
       progress = numbers[0];
      } else {
        progress = strings[0];
        for (let s = 0; s < stringsLength; s++) {
          const a = strings[s];
          const b = strings[s + 1];
          const n = numbers[s];
          if (!isNaN(n)) {
            if (!b) {
              progress += n + ' ';
            } else {
              progress += n + b;
            }
          }
        }
      }
      setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms);
      anim.currentValue = progress;
      i++;
    }
  }
```
