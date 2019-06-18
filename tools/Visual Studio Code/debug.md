# Debugging

## Debug menu
The top-level Debug menu has the most common debug commands

## Launch configurations

### 添加新配置
- 当光标在配置数组内，可以直接输入环境,会有智能感知提示
- 在调试框点击添加配置
- 在Debug菜单添加

### 启动调试
- F5启动
- 命令选项版(Ctrl + Shift + P)启动

### Launch.json属性
Ctrl + Space 智能感知  
note: win10自动占用
- type  
  the type of debugger to use for this launch configuration. 
- request  
  the request type of this launch configuration. 
- name
  the reader-friendly name to appear in the Debug launch configuration drop-down.

调试器支持选项

- program - 启动调试器时要运行的可执行文件或文件
- args - 传递给程序进行调试的参数
- env- 环境变量（该值null可用于“取消定义”变量）
- cwd - 当前工作目录，用于查找依赖项和其他文件
- port - 连接到正在运行的进程时的端口
- stopOnEntry - 程序启动时立即中断
- console-要使用什么样的主机，例如internalConsole，integratedTerminal或externalTerminal

### [变量替换](https://code.visualstudio.com/docs/editor/variables-reference)
- ${workspaceFolder} - 在VS Code中打开的文件夹的路径
- ${workspaceFolderBasename} - VS代码中打开的文件夹的名称，没有任何斜杠（/）
- ${file} - 当前打开的文件
- ${relativeFile} - 当前打开的文件相对于workspaceFolder
- ${fileBasename} - 当前打开文件的基本名称
- ${fileBasenameNoExtension} - 当前打开文件的基本名称，没有文件扩展名
- ${fileDirname} - 当前打开文件的目录名
- ${fileExtname} - 当前打开文件的扩展名
- ${cwd} - 启动时任务运行器的当前工作目录
- ${lineNumber} - 活动文件中当前选定的行号
- ${selectedText} - 活动文件中当前选定的文本
- ${execPath} - 运行VS Code可执行文件的路径

example  
位于/home/your-username/your-project/folder/file.ext编辑器中打开的文件;  
该目录/home/your-username/your-project作为根工作空间打开。  

${workspaceFolder} -/home/your-username/your-project  
${workspaceFolderBasename} -your-project  
${file} -/home/your-username/your-project/folder/file.ext  
${relativeFile} -folder/file.ext  
${fileBasename} -file.ext  
${fileBasenameNoExtension} -file  
${fileDirname} -/home/your-username/your-project/folder  
${fileExtname} -.ext  
${lineNumber} - 游标的行号  
${selectedText} - 在代码编辑器中选择的文本  
${execPath} - Code.exe的位置  

## 断点
- 条件断点
  - 表达式求值为true断点
  - 命中断点
  - 记录断点
- 基础断点
- 函数断点

## 多目标调试
1.直接启动两个，自动切换到多目标调试UI
2.复合启动配置
```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Server",
            "program": "${workspaceFolder}/server.js",
            "cwd": "${workspaceFolder}"
        },
        {
            "type": "node",
            "request": "launch",
            "name": "Client",
            "program": "${workspaceFolder}/client.js",
            "cwd": "${workspaceFolder}"
        }
    ],
    "compounds": [
        {
            "name": "Server/Client",
            "configurations": ["Server", "Client"]
        }
    ]
}
```