# slot

插槽元素，与 shadow dom 搭配使用,允许替换其中的节点

1. 匿名的 slot,写其中元素的时候不需要 name

   ```html
   <!-- Default slot. If there's more than one default slot, the first is used. -->
   <slot></slot>

   <slot>fallback content</slot>
   <!-- default slot with fallback content -->

   <slot>
     <!-- default slot entire DOM tree as fallback -->
     <h2>Title</h2>
     <summary>Description text</summary>
   </slot>
   ```

2. 命名 slot,slot 带有一个 name 属性,在写填充元素的时候需要给其 slot 属性赋予 name

```html
<div id="tabs">
  <slot id="tabsSlot" name="title"></slot>
  <!-- named slot -->
</div>
<div id="panels">
  <slot id="panelsSlot"></slot>
</div>
```

例子:

```html
<template id="my-paragraph">
  <style>
    p {
      color: white;
      background-color: #666;
      padding: 5px;
    }
  </style>
  //在模板中声明了插槽的位置，并放置一个默认的text元素
  <p><slot name="my-text">My default text</slot></p>
</template>

//my-paragraph自定义元素拥有template样式的子元素
//如果子元素里面有对应的slot元素，并且与shadow
dom为同级，将用slot元素替代模板中的slot位置
<my-paragraph>
  <span slot="my-text">Let's have some different text!</span>
</my-paragraph>
```

## API

1. slot.slotchange() 当插槽的分布式节点更改时，将触发该事件。例如，如果用户从 light DOM 添加/删除子级。

   ```typescript
   const slot = this.shadowRoot.querySelector("#slot");
   slot.addEventListener("slotchange", e => {
     console.log("light dom children changed!");
   });
   ```

2. slot.assignedNodes() 返回该插槽正在渲染的元素

```html
<slot><b>fallback content</b></slot>
```

| Usage                                         | Call                                 | Result                    |
| --------------------------------------------- | ------------------------------------ | ------------------------- |
| `<my-component>component text</my-component>` | slot.assignedNodes();                | [component text]          |
| `<my-component></my-component>`               | slot.assignedNodes();                | []                        |
| `<my-component></my-component>`               | slot.assignedNodes({flatten: true}); | [<b>fallback content</b>] |
