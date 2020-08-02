# grid 布局

> [张鑫旭的 <写给自己看的 grid>](https://www.zhangxinxu.com/wordpress/2018/11/display-grid-css-css3/)  
> [minmax](https://www.zhangxinxu.com/wordpress/2019/11/css-grid-minmax/)  
> [repeat](https://www.zhangxinxu.com/wordpress/2019/12/css-repeat/)

## grid 容器

### 网格分布

grid 横纵排布

- grid-template-columns
- grid-template-rows

grid 网格区域分割

- grid-template-areas

上述合并

- grid-template

---

- repeat
  - auto-fill
  - auto-fit
- minmax 当 min 大于 max 时,max 无效

  ```css
  minmax(min, max)
  minmax( [ <length> | <percentage> | <flex> | min-content | max-content | auto ] , [ <length> | <percentage> | <flex> | min-content | max-content | auto ] )
  ```

### 网格间隙

横纵网格,也适用于 flex

- gap

### 网格内元素排布

- justify-items 水平方向排布
- align-items 垂直方向排布

### 网格排布

- justify-content
- align-content

### 隐式网格

指定任何自动生成的网格轨道（也称为隐式网格轨道）的大小。 当网格项目多于网格中的单元格或网格项目放置在显式网格之外时，将创建隐式轨道。

- rid-auto-columns
- grid-auto-rows

## grid 子项

### grid 位置

如果 grid 容器中声明了分割线的名称 这里的属性值就可以使用名称,不然就用序号 1,2,3 这样子

- grid-column-start
- grid-column-end
- grid-row-start
- grid-row-end

```css
.item-b {
  grid-column-start: 2;
  grid-column-end: span 纵线3;
  grid-row-start: 第一行开始;
  grid-row-end: span 3;
}
```

span 后的数字表示占据 grid 个数
如果是文字表示到匹配的线
如果没有匹配就一直扩展

---

合并写作

- grid-column
- grid-row

或者

- grid-area 属性值`<name> | <row-start> / <column-start> / <row-end> / <column-end>;`

### 在格子中的位置

- justify-self 水平
- align-self 垂直

---

合并

- place-self `<align-self> <justify-self>?`
