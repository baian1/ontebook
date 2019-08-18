# package

1. 一个包含 package.json 的文件呀
2. 一个包含(1)文件夹的压缩包
3. 一个可以下载到压缩包的资源 url

4. 一个\<name>@\<version> 的字符串
5. 一个\<name>@\<tag>的字符串
6. 一个\<name> 的字符串,默认添加 latest 标签得到\<name>@latest

7. 一个 git url, 该 url 所指向的代码库满足条件 (a)

# 安装本地/远程 git 仓库包

## 本地模块引用

将本地需要引用的文件安装到 node_modules 中

1. 创建一个文件夹,将需要的文件放入其内
2. 创建 package.json 在其中声明"main": "<要导出文件的文件名>.js"
3. 在根目录的 package.json

```
{
  "dependencies": {
    "config": "file:./文件夹名字"
  }
}
```

4. 然后执行 npm install  
   或者在第二部后直接 npm install file:./文件夹名字

## git 上共享 package

```
<protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish> | #semver:<semver>]
```

```
git+ssh://git@github.com:npm/npm.git#v1.0.27
git+ssh://git@github.com:npm/npm#semver:^5.0
git+https://isaacs@github.com/npm/npm.git
git://github.com/npm/npm.git#v1.0.27
```

# package-lock

锁定依赖安装结构,npm install 的时候会按照这个文件来

# semver

npm 依赖管理  
semver 约定一个包的版本号必须包含 3 个数字，格式必须为 MAJOR.MINOR.PATCH, 意为 主版本  号.小版本号.修订版本号.

- MAJOR 对应大的版本号迭代，做了不兼容旧版的修改时要更新 MAJOR 版本号
- MINOR 对应小版本迭代，发生兼容旧版 API 的修改或功能更新时，更新 MINOR 版本号
- PATCH 对应修订版本号，一般针对修复 BUG 的版本号

## range

1. ^2.2.1 指定 MAJOR 版本下,所有更新的版本
2. ~2.2.1 指定 MAJOR.MINOR 版本号下，所有更新的版本
3. \>=2.1 和<=2.2 版本号控制
4. 1.0.0 - 2.0.0 版本范围

上述规则可以使用符号连接

1. ' ' 空格表示与逻辑,要符合两个规则
2. || 表示或逻辑,规则的并集

3. \* 或 x 匹配所有主版本
4. 1 或 1.x 匹配 主版本号为 1 的所有版本
5. 1.2 或 1.2.x 匹配 版本号为 1.2 开头的所有版本

## -

版本后面-追加 Prerelese Tags 表示不稳定版本

# 包管理最佳实践

1. 用 npm: >=5.1 版本, 保持 package-lock.json 文件默认开启配置
2. 升级依赖包

   - 升级小版本: 本地执行 npm update 升级到新的小版本
   - 升级大版本: 本地执行 npm install \<package-name>@\<version>

3. 降级依赖包  
   npm install \<package-name>@\<old-version>
4. 删除依赖包  
   npm uninstall \<package>
