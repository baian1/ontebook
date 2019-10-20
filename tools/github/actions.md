# workflow

工作流,一组 action 的集合

- name  
  表示该 workflow 的名字
- on
  该 workflow 的触发条件

  1. 动作触发任务, push,pull_request 等,并且可以加上 branch,tags,paths,branches-ignore,tags-ignore 等约束,对事件进行过滤

  ```
  on:
  pull_request:
    branches:
    - master
  ```

  2. [事件触发](https://help.github.com/en/articles/events-that-trigger-workflows#webhook-events),事件都预先设置好了,可以通过 types 覆盖默认设置

  3. 定时任务

  ```
  on:
    schedule:
    - cron: "0 2 * * 1-5"
  ```

  ```
  ┌───────────── minute (0 - 59)
  │ ┌───────────── hour (0 - 23)
  │ │ ┌───────────── day of the month (1 - 31)
  │ │ │ ┌───────────── month (1 - 12 or JAN-DEC)
  │ │ │ │ ┌───────────── day of the week (0 - 6 or SUN-SAT)
  │ │ │ │ │
  │ │ │ │ │
  │ │ │ │ │
  * * * * *
  ```

- jobs
  要进行的 actions 列表

# jobs

- jobs.<job_id>  
  Each job must have an id to associate with the job.
- jobs.<job_id>.name  
  显示在 github 运行时的名字
- jobs.<job_id>.needs  
  需要事先完成的 jobs
- jobs.<job_id>.runs-on
  运行环境
- jobs.<job_id>.env  
  环境变量
- jobs.<job_id>.if  
  控制 job 运行
- jobs.<job_id>.steps  
  jobs 中包含的一系列任务,其值是一个数组,包含许多 step
  - uses 外部可重用的单元
  - name 现实的名字
  - id
  - if
  - run 与 shell 指定命令的运行
  - with 个输入参数都是一个键/值对。输入参数设置为环境变量。变量带有前缀 INPUT\_并转换为大写。
