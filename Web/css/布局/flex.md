# Dimension(尺寸)

min-height 与 min-width 属性初始值将为 0。  
flex 值：  
<'flex-grow'> 盒子拉伸因子  
<'flex-shrink'> 收缩因子  
<'flex-basis'> content | <'width'> 主轴方向初始大小

- One-value

  - 单个数字表示 拉伸因子
  - 带单位表示 flex-basis
  - initial | auto | none

- Two-value

  - number flex-shrink
  - number | width flex-shrink 或 flex-basis

- Three-value

  - number fo r flex-grow
  - number for flex-shrink
  - width for flex-basis

# Axis(轴)

## 轴线方向

flex-direction：

- row
- row-reverse
- column
- column-reverse

## 容器

flex-wrap

- nowrap
- wrap
- wrap-reverse

用来确认在轴线方向上,元素溢出后,新一行还是压缩元素  
wrap 会根据子元素的 width 属性,先进行分行,再拉伸或压缩

## 轴排布

- justify-content 元素在主轴上的排布
- align-content 存在多行时,侧轴上的元素排布
- align-items 子项相对于 flex 容器,在交叉轴上的排布
  - align-self 单个弹性项目在侧轴对其方式,用于覆盖父元素的 align-items 行为

# container

弹性容器有主轴起点/主轴终点/侧轴起点/侧轴终点  
order 描述了排布顺序

# 问题

1. flex-basis 中 auto 与 0 的差别,auto 会将元素的 width 设置为内容元素的宽度，而 0 可以设置元素宽度为 0,再设置 grow 来进行扩展,会使元素尽可能的进行折叠

2. flex 元素设置 grow 为 1 后,该元素会被其子元素撑开,有时候我们需要一个区域是根据弹性盒子达到指定长宽时,可以使用 overflow: hidden;来使其不被子元素撑开
