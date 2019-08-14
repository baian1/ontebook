# Truthiness

- toBeNull 只匹配 null
- toBeUndefined 只匹配 undefined
- toBeDefined 与 toBeUndefined 相反
- toBeTruthy 匹配任何 if 语句为真
- toBeFalsy 匹配任何 if 语句为假

# number

- toBeGreaterThan(3)
- toBeGreaterThanOrEqual(3.5)
- toBeLessThan(5)
- toBeLessThanOrEqual(4.5)

toBe and toEqual are equivalent for numbers

- toBe(4)
- toEqual(4)
- toBeCloseTo(0.3) 用于浮点数判断

# string

toMatch(/I/) 可以使用正则来进行匹配

# Arrays and iterables

toContain('beer') 用来判断是否包含某一项

# Throw

expect(compileAndroidCode).toThrow('you are using the wrong JDK') 测试的特定函数抛出一个错误
