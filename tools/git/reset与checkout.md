# reset
命令:
1. --soft：修改HEAD，不修改index和workspace。  
表现为修改的文件会在staged区域,跟Head中的老快照进行对比,显示index modified
2. --mixed：修改HEAD和index，不修改workspace。默认行为。  
表现修改的文件依然会在workspace中,并显示modified
3. --hard：修改HEAD、index、workspace。  
表现是修改后的文件都被删除了,完全还原为那个节点的样子

## 携带文件参数
更新暂存区的文件快照
```
//将文件从HEAD指针的快照中拉出来,修改index中的相应文件快照
//简而言之,文件在index中删除,workspace中保留
git reset file.txt
//等价
git reset --mixed HEAD file.txt
```

# checkout
基本用于切换分支,会将HEAD移动到目标分支,并且更新index和workspace,对于workspace中的更改状态文件不会重置

## 带文件参数
```
git checkout [branch] [file]
```
1. 更新了index区域里file文件的内容
2. 更新了working directory里file文件的内容