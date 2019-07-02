# typesVersions
```
{
  "name": "package-name",
  "version": "1.0",
  "types": "./index.d.ts",
  "typesVersions": {
      ">=3.1": { "*": ["ts3.1/*"] }
  }
}
```
package.json告诉TypeScript去检查当前版本的TypeScript是否正在运行。 如果是3.1或以上的版本，它会找出你导入的包的路径，然后读取这个包里面的ts3.1文件夹里的内容。 这就是{ "\*": ["ts3.1/*"] }的意义 - 如果你对路径映射熟悉，它们的工作方式类似。

因此在上例中，如果我们正在从"package-name"中导入，并且正在运行的TypeScript版本为3.1，我们会尝试从[...]/node_modules/package-name/ts3.1/index.d.ts开始解析。 如果是从package-name/foo导入，由会查找[...]/node_modules/package-name/ts3.1/foo.d.ts和[...]/node_modules/package-name/ts3.1/foo/index.d.ts。

如果typesVersions里没有能匹配上的版本，TypeScript将回退到查看types字段，因此TypeScript 3.0及之前的版本会重定向到[...]/node_modules/package-name/index.d.ts。