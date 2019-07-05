# resolve
- resolve.alias
  将import中的名字匹配并解析  
  $只会与匹配的名字才会更改替换

alias:	|import 'xyz'	|import 'xyz/file.js'
|------|--|--|
{}|/abc/node_modules/xyz/index.js|/abc/node_modules/xyz/file.js
{ xyz: '/abs/path/to/file.js' }|/abs/path/to/file.js|error
{ xyz$: '/abs/path/to/file.js' }|/abs/path/to/file.js|/abc/node_modules/xyz/file.js
{ xyz: './dir/file.js' }|/abc/dir/file.js|error
{ xyz$: './dir/file.js' }|/abc/dir/file.js|/abc/node_modules/xyz/file.js
{ xyz: '/some/dir' }|/some/dir/index.js|/some/dir/file.js
{ xyz$: '/some/dir' }|/some/dir/index.js|/abc/node_modules/xyz/file.js
{ xyz: './dir' }|/abc/dir/index.js|/abc/dir/file.js
{ xyz: 'modu' }|/abc/node_modules/modu/index.js|/abc/node_modules/modu/file.js
{ xyz$: 'modu' }|/abc/node_modules/modu/index.js|/abc/node_modules/xyz/file.js
{ xyz: 'modu/some/file.js' }|/abc/node_modules/modu/some/file.js|error
{ xyz: 'modu/dir' }|/abc/node_modules/modu/dir/index.js|/abc/node_modules/dir/file.js
{ xyz: 'xyz/dir' }|/abc/node_modules/xyz/dir/index.js|/abc/node_modules/xyz/dir/file.js
{ xyz$: 'xyz/dir' }|/abc/node_modules/xyz/dir/index.js|/abc/node_modules/xyz/file.js
```
resolve: {
  alias: {
    Utilities: path.resolve(__dirname, 'src/utilities/'),
    Templates: path.resolve(__dirname, 'src/templates/')
  }
}
```
- resolve.aliasField  
  可以不加载某些文件或者替换某些需要加载的文件而不需要一个个修改文件
- resolve.enforceExtension  
  扩展强制要求
- enforceModuleExtension  
  modules第三方模块扩展的扩展
- resolve.extensions
  使用指定扩展名尝试不带扩展名的文件
```
module.exports = {
  //...
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json']
  }
};
```