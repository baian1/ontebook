# Vdom 树

类似于网页的 dom 对象,在 js 中以对象简单表示，然后也类似 dom 树进行构造

比如 hyperscript 库,可以通过函数构造真实 dom,就是一颗树

react 之类的就能通过同样的原理构造自己的 Vdom

preact 中在 create-element.js

# render

Vdom 树构建完成后,我们需要将其转换到真实 dom 输出,使用了 render

render 中构建全新的 Vdom 树,通过 diff 来确认更新哪些节点
