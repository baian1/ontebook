# pm2

node 编写的进程管理工具

# 基本命令

## 启动一个进程

```
//start
pm2 start app.js

//args
# Specify an app name
--name <app_name>

# Watch and Restart app when files change
--watch

# Set memory threshold for app reload
--max-memory-restart <200MB>

# Specify log file
--log <log_path>

# Pass extra arguments to the script
-- arg1 arg2 arg3

# Delay between automatic restarts
--restart-delay <delay in ms>

# Prefix logs with time
--time

# Do not auto restart app
--no-autorestart

# Specify cron for forced restart
--cron <cron_pattern>

# Attach to application log
--no-daemon
```

## 多进程

```
$ pm2 start app.js -i max
```

- 0/max 所有 cpu 都复制一个进程
- -1 CPUs-1 进程数
- number to spread the app across number CPUs

```
pm2 scale app +3
pm2 scale app 2
```

- number 表示控制进程数量到 number,多的减少,少的复制
- +number 表示增加进程

## 管理进程

```
//启动进程
$ pm2 start app.js
//重启
$ pm2 restart app_name
//重新加载配置
$ pm2 reload app_name
//暂停进程
$ pm2 stop app_name
//删除一个进程
$ pm2 delete app_name
```

app_name:

- **all** to act on all processes
- **id** to act on a specific process id

## 管理进程信息

```
//查看进程列表
$ pm2 [list|ls|status]
//打印日志,加上--line表示最长日志长度
$ pm2 logs --lines 200
//打印相关信息到terminal
$ pm2 monit
```

## 按照文件启动

```
$ pm2 ecosystem

//ecosystem.config.js
module.exports = {
  apps : [{
    name: "app",
    script: "./app.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }, {
     name: 'worker',
     script: 'worker.js'
  }]
}
```
