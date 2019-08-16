# hooks

可以在 git 执行的操作前或后接上一些脚本操作

# hooks 模板生成优先度

1. The argument given with the --template option.  
   win 下的 templates 在 C:\Program Files\Git\mingw64\share\git-core\templates

```
git init --template=/path/to/your/templates/directory/
```

2. The value of the \$GIT_TEMPLATE_DIR.
3. The init.templatedir configuration variable.
4. The default templates directory.

# 具体操作

## 电子右键工作流程钩子

由 git am 调用

- applypatch-msg
- pre-applypatch
- post-applypatch

## commite 钩子

- pre-commit  
  用于在提交前执行 test,lint 等
- prepare-commit-msg  
  提交信息编辑器被触发之前钩子运行，但在创建默认的消息后。它允许您在提交作者看到之前编辑默认消息。
- commit-msg  
  接收一个参数，此参数是路径到包含由开发者编写的提交信息的临时文件。  
  如果此脚本退出非零，Git 将中止提交过程，因此您可以在允许提交之前使用它来验证项目状态或提交消息。
- post-commit
  在提交后执行,通常用于通知或类似东西

## 其他客户端钩子

- pre-rebase
- post-checkout
- post-merge
- pre-push
- post-update
- pre-auto-gc
- post-rewrite

## 服务器钩子

- pre-receive
- update
- post-receive
