# rules

```
{
  "rules": {
    "eqeqeq": "off",
    "curly": "error",
    "quotes": ["error", "double"]
    //配置插件中的规则
    "plugin1/rule1": "error"
  }
}
```

# 为一组文件配置规则

```
{
  "rules": {...},
  "overrides": [
    {
      "files": ["*-test.js","*.spec.js"],
      "rules": {
        "no-unused-expressions": "off"
      }
    }
  ]
}
```

# 具体规则

1. 限制导入整个包

```
//对于Bar,我们必须从分离的路径/import-foo/baz/中导入
"no-restricted-imports": ["error", {
  "paths": [{
    "name": "import-foo",
    "importNames": ["Bar"],
    "message": "Please use Bar from /import-bar/baz/ instead."
  }]
}]
```

# 规则编写

## meta

- type  
  描述错误等级,"problem"，"suggestion"或"layout"
- docs  
  对错误的描述,还有在 recommended 中是否开启
- fixable  
  表示是否会在运行命令行,有--fix 时进行修复
- schema  
  规则控制选项,用来限制输入的规则
- replacedBy  
  在不推荐使用的规则的情况下，指定替换规则

## create

### context

传入一个对象 context,包含一些属性和方法
属性：

- parserOptions- 为此次运行配置的解析器选项（此处有更多详细信息）。
- id - 规则 ID。
- options- 此规则的已配置选项的数组。此阵列不包括规则严重性。有关更多信息，请参阅此处。
- settings- 配置中的共享设置。
- parserPath- parserfrom 配置的名称。
- parserServices - 包含解析器为规则提供的服务的对象。

方法：

- getAncestors() - 返回当前遍历节点的祖先数组，从 AST 的根开始并继续通过当前节点的直接父节点。此数组不包括当前遍历的节点本身。
- getDeclaredVariables(node)- 返回给定节点声明的变量列表。此信息可用于跟踪对变量的引用。
- getFilename() - 返回与源关联的文件名。
- getScope()- 返回当前遍历节点的范围。此信息可用于跟踪对变量的引用。
- getSourceCode()- 返回一个 SourceCode 对象，您可以使用该对象处理传递给 ESLint 的源。
- markVariableAsUsed(name) - 使用当前作用域中的给定名称标记变量。这会影响 no-unused-vars 规则。返回 true 如果找到具有给定名称的变量并将其标记为已使用，否则返回 false。
- report(descriptor)- 报告代码中的问题（请参阅专用部分）。

### return

返回一个对象,来应用于 AST 树
key:

- if a key is a node type or a selector, ESLint calls that visitor function while going down the tree
- if a key is a node type or a selector plus :exit, ESLint calls that visitor function while going up the tree
- if a key is an event name, ESLint calls that handler function for code path analysis

### 例子：

```
create(context) {
  /**
    * Returns the config option for the given node.
    * @param {ASTNode} node - A node to get the config for.
    * @returns {string} The config option.
    */
  function getConfigForNode(node) {
    if (
      node.generator &&
      context.options.length > 1 &&
      context.options[1].generators
    ) {
      return context.options[1].generators
    }

    return context.options[0] || "always"
  }

  /**
    * Determines whether the current FunctionExpression node is a get, set, or
    * shorthand method in an object literal or a class.
    * @param {ASTNode} node - A node to check.
    * @returns {boolean} True if the node is a get, set, or shorthand method.
    */
  function isObjectOrClassMethod(node) {
    const parent = node.parent

    return (
      parent.type === "MethodDefinition" ||
      (parent.type === "Property" &&
        (parent.method || parent.kind === "get" || parent.kind === "set"))
    )
  }

  /**
    * Determines whether the current FunctionExpression node has a name that would be
    * inferred from context in a conforming ES6 environment.
    * @param {ASTNode} node - A node to check.
    * @returns {boolean} True if the node would have a name assigned automatically.
    */
  function hasInferredName(node) {
    const parent = node.parent

    return (
      isObjectOrClassMethod(node) ||
      (parent.type === "VariableDeclarator" &&
        parent.id.type === "Identifier" &&
        parent.init === node) ||
      (parent.type === "Property" && parent.value === node) ||
      (parent.type === "AssignmentExpression" &&
        parent.left.type === "Identifier" &&
        parent.right === node) ||
      (parent.type === "ExportDefaultDeclaration" &&
        parent.declaration === node) ||
      (parent.type === "AssignmentPattern" && parent.right === node)
    )
  }

  /**
    * Reports that an unnamed function should be named
    * @param {ASTNode} node - The node to report in the event of an error.
    * @returns {void}
    */
  function reportUnexpectedUnnamedFunction(node) {
    context.report({
      node,
      messageId: "unnamed",
      data: { name: astUtils.getFunctionNameWithKind(node) },
    })
  }

  /**
    * Reports that a named function should be unnamed
    * @param {ASTNode} node - The node to report in the event of an error.
    * @returns {void}
    */
  function reportUnexpectedNamedFunction(node) {
    context.report({
      node,
      messageId: "named",
      data: { name: astUtils.getFunctionNameWithKind(node) },
    })
  }

  return {
    "FunctionExpression:exit"(node) {
      // Skip recursive functions.
      const nameVar = context.getDeclaredVariables(node)[0]

      if (isFunctionName(nameVar) && nameVar.references.length > 0) {
        return
      }

      const hasName = Boolean(node.id && node.id.name)
      const config = getConfigForNode(node)

      if (config === "never") {
        if (hasName) {
          reportUnexpectedNamedFunction(node)
        }
      } else if (config === "as-needed") {
        if (!hasName && !hasInferredName(node)) {
          reportUnexpectedUnnamedFunction(node)
        }
      } else {
        if (!hasName && !isObjectOrClassMethod(node)) {
          reportUnexpectedUnnamedFunction(node)
        }
      }
    },
  }
```
