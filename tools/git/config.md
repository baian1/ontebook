# 配置文件位置

1. /etc/gitconfig 文件: 包含系统上每一个用户及他们仓库的通用配置。 如果使用带有 --system 选项的 git config 时，它会从此文件读写配置变量。
2. ~/.gitconfig 或 ~/.config/git/config 文件：只针对当前用户。 可以传递 --global 选项让 Git 读写此文件。
3. 当前使用仓库的 Git 目录中的 config 文件（就是 .git/config）：针对该仓库。

在 Windows 系统中，Git 会查找 $HOME 目录下（一般情况下是 C:\Users\$USER）的 .gitconfig 文件。

下面的配置会覆盖上面的配置

# 命令

- git config --list 列出配置
- git config --global core.editor emacs 修改相应配置文件字段
- git config user.name 查看相应字段

# 设置命令别名

```
//设置别名
git config --global alias.unstage 'reset HEAD --'
//以下命令等价
git unstage fileA
git reset HEAD -- fileA
```
