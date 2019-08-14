# beforeAll 与 afterAll

只会在测试中启动一次

# beforeEach 与 afterEach

每一个 test 都会执行

# describe

创建一个作用域，里面的 before 和 after 不会涉及到外面，外面的 before 和 after 依旧有用，而且是外层先执行,在执行作用域内

注意：在执行任何测试之前,所有 describe 都会被执行

# test.only

这是一个独立的测试,不会依赖其他东西
