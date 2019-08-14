# 快照

```
it('renders correctly', () => {
  //使用toMatchSnapshot生成快照,名字为renders correctly 1
  //每次进行测试都会和老的进行比较
  expect(xxx).toMatchSnapshot();
});
```

```
//使用Property Matchers
//适用于日期这类会变的数据
expect(user).toMatchSnapshot({
  createdAt: expect.any(Date),
  name: 'Bond... James Bond',
});

exports[`will check the values and pass 1`] = `
Object {
  "createdAt": Any<Date>,
  "name": 'Bond... James Bond',
}
`;
```

jest --updateSnapshot 使用新的快照
jest --watch 交互式更新快照

## 内联快照

借助 prettier 实现,如果默认设置找不到,需要在配置里配置"prettierPath"

## Best Practices

1. 测试应该是确定性的。在未更改的组件上多次运行相同的测试应该每次都产生相同的结果。
2. 使用描述性快照名称。
