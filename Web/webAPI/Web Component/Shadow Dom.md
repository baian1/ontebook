# Shadow Dom

将一颗 dom 树组成一个 shadow dom,附着在一个 shadow host 节点上

## style

1. 阴影 dom 具有独立的 style 作用域
2. css :host 表示 shadow host 节点的样式,可以用来覆盖外面的 css,表示根节点选择器  
   外部样式始终胜过影子 DOM 中定义的样式。
   :host(\<compound-selector-list>) 只有在 host 的属性与该 selector 匹配的时候才会应用类
3. :host-context(\<selector>) 组件或组建的祖先匹配

   ```html
   <body class="darktheme">
     <fancy-tabs>
       ...
     </fancy-tabs>
   </body>
   ```

4. ::slotted(\<compound-selector>)选择分配到 shadow dom 中的 slot

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
