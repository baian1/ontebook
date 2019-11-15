# Dll

将需要用到的包先打包出去,在项目打包的时候直接引用

## DllPlugin

用于将打包信息输出为 manifest.json,方便引用

- context (optional): 上下文目录
- name: 包暴露的名字
- path: manifest.json 文件绝对路径

## DllReferencePlugin

- context: 执行上下文
- manifest : 文件路径
- content (optional): the mappings from request to module id (defaults to manifest.content)
- name (optional): an identifier where the dll is exposed (defaults to manifest.name) (see also externals)
- scope (optional): prefix which is used for accessing the content of the dll
- sourceType (optional): 打包方式 umd,esm 等
