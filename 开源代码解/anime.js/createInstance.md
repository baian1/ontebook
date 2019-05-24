# 完整例子生成
```
function createNewInstance(params) {
  const instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
  const tweenSettings = replaceObjectProps(defaultTweenSettings, params);
  const properties = getProperties(tweenSettings, params);
  const animatables = getAnimatables(params.targets);
  const animations = getAnimations(animatables, properties);
  const timings = getInstanceTimings(animations, tweenSettings);
  const id = instanceID;
  instanceID++;
  return mergeObjects(instanceSettings, {
    id: id,
    children: [],
    animatables: animatables,
    animations: animations,
    duration: timings.duration,
    delay: timings.delay,
    endDelay: timings.endDelay
  });
}
```

## replaceObjectProps
```
默认设置
{
  update: null,
  begin: null,
  loopBegin: null,
  changeBegin: null,
  change: null,
  changeComplete: null,
  loopComplete: null,
  complete: null,
  loop: 1,
  direction: 'normal',
  autoplay: true,
  timelineOffset: 0
}
{
  duration: 1000,
  delay: 0,
  endDelay: 0,
  easing: 'easeOutElastic(1, .5)',
  round: 0
}
```
同上

## getProperties(tweenSettings, params);
```
function getProperties(tweenSettings, params) {
  const properties = [];
  const keyframes = params.keyframes;
  if (keyframes) params = mergeObjects(flattenKeyframes(keyframes), params);;
  for (let p in params) {
    if (is.key(p)) {
      properties.push({
        name: p,
        tweens: normalizePropertyTweens(params[p], tweenSettings)
      });
    }
  }
  return properties;
}
```
开始分离属性变化,属性就是排除上面的TweenSettings和defaultInstanceSettings内包含字段，加上target和keyform之外的字段  

这些字段描述变化，比如transformX，transformY  
设置properties数组存储这些动作  
这些动作都有一些参数的，设置相关参数
### normalizePropertyTweens(params[p], tweenSettings)
```
function normalizePropertyTweens(prop, tweenSettings) {
  let settings = cloneObject(tweenSettings);
  
  // Override duration if easing is a spring
  if (/^spring/.test(settings.easing)) settings.duration = spring(settings.easing);

  //is.arr(prop)假如是属性是数组格式，并且第一个参数是非对象，长度为二，   
  //表示from类型参数[from-to](https://animejs.com/documentation/#fromToValues)  
  //如果不是form类型  
  //持续时间是不是函数就对持续时间除于数组长度  **??**  
  //接下来将对象丢到数组中处理
  if (is.arr(prop)) {
    const l = prop.length;
    const isFromTo = (l === 2 && !is.obj(prop[0]));
    if (!isFromTo) {
      // Duration divided by the number of tweens
      if (!is.fnc(tweenSettings.duration)) settings.duration = tweenSettings.duration / l;
    } else {
      // Transform [from, to] values shorthand to a valid tween value
      prop = {value: prop};
    }
  }
  

  const propArray = is.arr(prop) ? prop : [prop];
  return propArray.map((v, i) => {
    const obj = (is.obj(v) && !is.pth(v)) ? v : {value: v};

    // Default delay value should only be applied to the first tween
    // 第0个运行的，并且没有设置delay，按照tweenSettings.delay，其他没有设置的按照0处理
    if (is.und(obj.delay)) obj.delay = !i ? tweenSettings.delay : 0;

    // Default endDelay value should only be applied to the last tween
    // 设置最后个运行的动画结束延迟时间
    if (is.und(obj.endDelay)) obj.endDelay = i === propArray.length - 1 ? tweenSettings.endDelay : 0;
    return obj;

    //将tween设置合并上去，保证参数完整
    //比如transformX,就需要运动函数，延迟，变化量，持续时间等
  }).map(k => mergeObjects(k, settings));
}
```


## getAnimatables(params.targets);
```
function getAnimatables(targets) {
  const parsed = parseTargets(targets);
  return parsed.map((t, i) => {
    return {target: t, id: i, total: parsed.length, transforms: { list: getElementTransforms(t) } };
  });
}

function parseTargets(targets) {
  const targetsArray = targets ? (flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets))) : [];
  return filterArray(targetsArray, (item, pos, self) => self.indexOf(item) === pos);
}
```
anime支持数组选择器,这里提供处理  

- const targetsArray = targets ? (flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets))) : [];
```
function flattenArray(arr) {
  return arr.reduce((a, b) => a.concat(is.arr(b) ? flattenArray(b) : b), []);
}

function toArray(o) {
  if (is.arr(o)) return o;
  if (is.str(o)) o = selectString(o) || o;
  if (o instanceof NodeList || o instanceof HTMLCollection) return [].slice.call(o);
  return [o];
}

function selectString(str) {
  try {
    let nodes = document.querySelectorAll(str);
    return nodes;
  } catch(e) {
    return;
  }
}
```
toArray作用：   
对数组直接返回，对css选择器选取结点返回  
对nodeList或者HTMLCollection(html元素集合)使用数组slice方法转为数组保存  
return [o] 为了应对document.querySelectorAll寻找到的为空，表示o为一个node结点对象

是数组，就对数组内每个进行toArray，不是就直接对其toArray  
返回的数组可能是数组套数组的，使用flattenArray对其处理，变成一个数组

- filterArray(targetsArray, (item, pos, self) => self.indexOf(item) === pos);
使用fileterArray过滤重复项

```
callback = (item, pos, self) => self.indexOf(item) === pos
function filterArray(arr, callback) {
  const len = arr.length;
  const thisArg = arguments.length >= 2 ? arguments[1] : void 0;
  const result = [];
  for (let i = 0; i < len; i++) {
    if (i in arr) {
      const val = arr[i];
      if (callback.call(thisArg, val, i, arr)) {
        result.push(val);
      }
    }
  }
  return result;
}
```
从前面往后遍历，找到重复返回false不将结果返回

获取到选择的元素

## getAnimations
将选择器选中元素和动作变化参数混合生成具体动作数组
```
function createAnimation(animatable, prop) {
  const animType = getAnimationType(animatable.target, prop.name);
  if (animType) {
    const tweens = normalizeTweens(prop, animatable);
    const lastTween = tweens[tweens.length - 1];
    return {
      type: animType,
      property: prop.name,
      animatable: animatable,
      tweens: tweens,
      duration: lastTween.end,
      delay: tweens[0].delay,
      endDelay: lastTween.endDelay
    }
  }
}

function getAnimations(animatables, properties) {
  return filterArray(flattenArray(animatables.map(animatable => {
    return properties.map(prop => {

      //每一个动作对象和动作变化参数合并
      return createAnimation(animatable, prop);
    });

    //排除重复
  })), a => !is.und(a));
}
```

## getInstanceTimings(animations, tweenSettings);
```
function getInstanceTimings(animations, tweenSettings) {
  const animLength = animations.length;
  const getTlOffset = anim => anim.timelineOffset ? anim.timelineOffset : 0;
  const timings = {};

  //取长的时间
  timings.duration = animLength ? Math.max.apply(Math, animations.map(anim => getTlOffset(anim) + anim.duration)) : tweenSettings.duration;

  //取短的延迟
  timings.delay = animLength ? Math.min.apply(Math, animations.map(anim => getTlOffset(anim) + anim.delay)) : tweenSettings.delay;

  //最长的结束延迟时间
  timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map(anim => getTlOffset(anim) + anim.duration - anim.endDelay)) : tweenSettings.endDelay;
  return timings;
}
```

## 结果
```
animatables:Array(1) [Object]             //保存target选择器结果
animations:Array(2) [Object, Object]      //保存合成运动，目标，动作参数，动作变化参数等
autoplay:true
begin:null
change:null
changeBegin:null
changeComplete:null
children:Array(0) []
complete:null
delay:0
direction:"normal"
duration:1000
endDelay:0
id:0
loop:0
loopBegin:null
loopComplete:null
timelineOffset:0
update:null
```