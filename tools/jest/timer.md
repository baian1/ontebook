# 模拟定时器

jest.useFakeTimers()可以将定时器都替换成 Mock 定时器

# 启动定时器

我们的模拟定时器需要自己来开启,jest.runAllTimers()运行所有定时器

对于定时器里面嵌套定时器的递归计时器,使用 runAllTimers 会导致无限循环,使用 jest.runOnlyPendingTimers()来运行定时器

按照时间执行定时器(执行时间段内所有会执行的定时器) jest.advanceTimersByTime(msToRun)

# 清除定时器

jest.clearAllTimers()
