# Shadow Dom

## style

1. 阴影 dom 具有独立的 style 作用域
2. css :host 表示 shadow host 节点的样式,可以用来覆盖外面的 css,表示根节点选择器  
   外部样式始终胜过影子 DOM 中定义的样式。
3. :host-context(<selector>) 组件或组建的祖先匹配
   ```
   <body class="darktheme">
     <fancy-tabs>
       ...
     </fancy-tabs>
   </body>
   ```
4. ::slotted(<compound-selector>)选择分配到 shadow dom 中的 slot

   - 根节点

   ```html
   <name-badge>
     //slot节点
     <h2>Eric Bidelman</h2>
     <span class="title">
       Digital Jedi, <span class="company">Google</span>
     </span>
   </name-badge>

   <style>
     //选择slot节点
     ::slotted(h2) {
       margin: 0;
       font-weight: 300;
       color: red;
     }
     ::slotted(.title) {
       color: orange;
     }
     /* DOESN'T WORK (can only select top-level nodes).
     ::slotted(.company),
     ::slotted(.title .company) {
       text-transform: uppercase;
     }
     */
   </style>
   <slot></slot>
   ```

   - 在分发 slot 的时候,它原来的样式依旧有效,还可以给 slot 添加样式

   ```html
   <style>
     #panels {
       box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
       background: white;
       border-radius: 3px;
       padding: 16px;
       height: 250px;
       overflow: auto;
     }
     #tabs {
       display: inline-flex;
       -webkit-user-select: none;
       user-select: none;
     }
     #tabsSlot::slotted(*) {
       font: 400 16px/22px "Roboto";
       padding: 16px 8px;
       ...;
     }
     #tabsSlot::slotted([aria-selected="true"]) {
       font-weight: 600;
       background: white;
       box-shadow: none;
     }
     #panelsSlot::slotted([aria-hidden="true"]) {
       display: none;
     }
   </style>
   <div id="tabs">
     <slot id="tabsSlot" name="title"></slot>
   </div>
   <div id="panels">
     <slot id="panelsSlot"></slot>
   </div>
   ```

   5. Resetting inheritable styles,对于 inheritable styles (background, color, font, line-height, etc.),shadow dom 中的元素会继承范围外的样式  
      如果想要隔绝外部样式,设置
      ```html
      <style>
        :host {
          all: initial;
        }
      </style>
      ```

## Shadow DOM 事件模型

当事件从影子 DOM 冒起时，将调整其 target 以维护影子 DOM 提供的封装。

1. cross the shadow boundary
   -Focus Events: blur, focus, focusin, focusout

   - Mouse Events: click, dblclick, mousedown, mouseenter, mousemove, etc.
   - Wheel Events: wheel
   - Input Events: beforeinput, input
   - Keyboard Events: keydown, keyup
   - Composition Events: compositionstart, compositionupdate, compositionend
     -sDragEvent: dragstart, drag, dragend, drop, etc.

   Tips:
   If the shadow tree is open, calling event.composedPath() will return an array of nodes that the event traveled through.

2. Custom DOM 默认创建的，不会冒泡越过边界，设置 composed: true 可以越界

事件:

1. focus 状态相关的有一个 delegatesFocus: boolean
   - true 当其中一个元素或者 shadow dom 元素被点击时,所有元素的状态都变为 fouce
   - false 点哪里，哪个元素状态改变为 focus

# template

该元素存在于 dom 树中，但是不渲染，可以作为一种重复使用的结构

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

```
<div id="tabs">
  <slot id="tabsSlot" name="title"></slot> <!-- named slot -->
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
