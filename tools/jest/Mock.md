# mock function

```
//创建一个函数,每次被调用的相关信息会存储在mockCallback.mock中
const mockCallback = jest.fn(x => 42 + x);
mockCallback(5)

// The function was called exactly once
expect(someMockFunction.mock.calls.length).toBe(1);

// The first arg of the first call to the function was 'first arg'
expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

// The second arg of the first call to the function was 'second arg'
expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

// The return value of the first call to the function was 'return value'
expect(someMockFunction.mock.results[0].value).toBe('return value');

// This function was instantiated exactly twice(被调用的时候的this指向,如果没有指向为undefind)
expect(someMockFunction.mock.instances.length).toBe(2);

// The object returned by the first instantiation of this function
// had a `name` property whose value was set to 'test'
expect(someMockFunction.mock.instances[0].name).toEqual('test');
```

# Mock Return Values

上面我们已经能创建一个函数,有输入与返回  
这里我们使用 mockReturn 来使函数来返回固定值  
这样执行的函数,也会被记录在 mock 中
减轻需要复杂计算才能获取的返回值,可以直接将重复值注入测试

```
const myMock = jest.fn();

myMock
  .mockReturnValueOnce(10)
  .mockReturnValueOnce('x')
  .mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true
```

# Mocking Modules

上面我们讲到自己创建一个模拟函数  
现在我们根据导入模块,创建模拟函数 jest.mock('XXX')  
XXX 的导出的每一个变量名都会被我们的模拟函数取代

```
//foo.js
module.exports = {
  getname:function() {
    // some implementation;
  },
  hello:function(){
    return 'hello'
  }
};

jest.mock("./foo"); // this happens automatically with automocking
const foo = require('./foo');
//这样导入的foo.getname和hello都将被jest.fn()取代
```

例子:
模拟 ajax 请求

需要依赖 axios 模块

```
// users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}

export default Users;
```

直接模拟 axios 的返回值

```
// users.test.js
import axios from 'axios';
import Users from './users';

//模拟axios
jest.mock('axios');

test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};

  //给模块确定返回值
  axios.get.mockResolvedValue(resp);
  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users));
});
```

# Mock Implementations

导入一个模块,然后我们可以用自己的函数去取代导入模块的函数

```
// foo.js
module.exports = function() {
  // some implementation;
};

// test.js
jest.mock('../foo'); // this happens automatically with automocking
const foo = require('../foo');

// foo is a mock function
foo.mockImplementation(() => 42);
foo();
// > 42
```

jest.mock('../foo')创建需要依赖 foo,它会根据 foo 的形状创建模拟函数

# Mock Names

用于快速识别出出错函数

```
const myMockFn = jest
  .fn()
  .mockReturnValue('default')
  .mockImplementation(scalar => 42 + scalar)
  .mockName('add42');
```
