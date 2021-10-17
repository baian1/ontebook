# [react心智模型](https://github.com/reactjs/react-basic)

```js
//react的核心：将数据映射为另一套数据
function  NameBox ( name )  { 
  return  {  fontWeight : 'bold' ,  labelContent : name  } ; 
}
```

```js
//一个UI会很大，单个函数不能完整描述，需要有UI的抽象
//比如下面定义了结构
//- borderStyle 样式数据
//- childContent 子元素的数据
function  FancyUserBox ( user )  { 
  return  { 
    borderStyle : '1px solid blue' , 
    childContent : [ 
      'Name: ' , 
      NameBox ( user . firstName  +  ' '  +  user . lastName ) 
    ] 
  } ; 
}
```

```js
//组合抽象，不仅仅需要支持子元素的组合，还需要提供样式等抽象的组合能力
function FancyBox(children) {
  return {
    borderStyle: '1px solid blue',
    children: children
  };
}

function UserBox(user) {
  return FancyBox([
    'Name: ',
    NameBox(user.firstName + ' ' + user.lastName)
  ]);
}
```

```js
function FancyNameBox(user, likes, onClick) {
  return FancyBox([
    'Name: ', NameBox(user.firstName + ' ' + user.lastName),
    'Likes: ', LikeBox(likes),
    LikeButton(onClick)
  ]);
}

// Implementation Details

var likes = 0;
function addOneMoreLike() {
  likes++;
  rerender();
}

// Init

FancyNameBox(
  { firstName: 'Sebastian', lastName: 'Markbåge' },
  likes,
  addOneMoreLike
);
```
