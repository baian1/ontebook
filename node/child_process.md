# spaw

可以通过运行 bat 等脚本来创建子进程

```
child_process.spawn(command[, args][, options])
```

- **command** \<string> The command to run.
- **args** \<string[]> List of string arguments.
- **options** \<Object>
  - cwd \<string> Current working directory of the child process.
  - env \<Object> Environment key-value pairs. Default: process.env.
  - argv0 \<string> Explicitly set the value of argv[0] sent to the child process. This will be set to command if not specified.
  - stdio \<Array> | \<string> Child's stdio configuration (see options.stdio).
  - detached \<boolean> Prepare child to run independently of its parent process. Specific behavior depends on the platform, see options.detached).
  - uid \<number> Sets the user identity of the process (see setuid(2)).
  - gid \<number> Sets the group identity of the process (see setgid(2)).
  - shell \<boolean> | \<string> If true, runs command inside of a shell. Uses '/bin/sh' on Unix, and process.env.ComSpec on Windows. A different shell can be specified as a string. See Shell Requirements and Default Windows Shell. Default: false (no shell).
  - windowsVerbatimArguments \<boolean> No quoting or escaping of arguments is done on Windows. Ignored on Unix. This is set to true automatically when shell is specified and is CMD. Default: false.
  - windowsHide \<boolean> Hide the subprocess console window that would normally be created on Windows systems. Default: false.
- **Returns**: \<ChildProcess>

## arg0

可以通过这个传递字符串

## stdio

可以设置将子进程的 stdin,stdout,stderr 是否附加到 child 变量上

## detached

在 Windows 上，设置 options.detached 为 true 允许子进程在父进程退出后继续运行。孩子将拥有自己的控制台窗口。为子进程启用后，无法禁用它。

在非 Windows 平台上，如果 options.detached 设置为 true，则子进程将成为新进程组和会话的领导者。子进程可以在父进程退出后继续运行，无论它们是否已分离。

默认情况下父将会等待子进程退出,使用 subprocess.unref()取消引用,父进程将会独立退出

## subprocess.ref()

父进程对子进程的计数引用

## ipc

父与子进程通过 child_Process.send()来进行通讯
