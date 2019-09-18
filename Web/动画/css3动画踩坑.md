# scale

使用 scale 的时候会造成旁边相关元素受到影响

解决方法:

1. 使用 backface-visibility: hidden;或者 transform: translate3d(0, 0, 0);使元素分层,可以在 chrome 中查看 layout 效果
2. perspective 设置透视属性,可以减轻影响
