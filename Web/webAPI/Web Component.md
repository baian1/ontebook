# Web Component

自定义 HTML 元素,设置一些动作状态。

## 自定义元素的生命周期事件

1. constructor  
   在 dom 元素被创建的时候触发

2. connectedCallback 与 disconnectedCallback  
   dom 元素 的挂载与卸载

3. attributeChangedCallback(attrName, oldVal, newVal)  
   在 dom 元素的 attribute 改变的时候触发(限制:属性需要是 observed attribute 或 该元素的创建阶段 attribute 初始化)

- note: observed attribute
  ```Typescript
  static get observedAttributes() {
    return ['disabled', 'open'];
  }
  ```

4. adoptedCallback
   custom element has been moved into a new document

## 定义

1. customElements.define('fancy-button', FancyButton, {extends: 'button'})定义组件,
   第三个参数,由于一些标签是 extends 同一个 HTMLement 的,使用 extends 就能明确是基于哪个标签的增强

2. customElements.whenDefined(cb)可以在定义的时候触发回调

3. customElements.get('fancy-button')获取自定义的元素

css 选择未定义元素:not(:defined)

### Extending native HTML elements

```Typescript
//扩展元素
class FancyButton extends HTMLButtonElement {
  constructor() {
    super(); // always call super() first in the constructor.
    this.addEventListener('click', e => this.drawRipple(e.offsetX, e.offsetY));
  }

  // Material design ripple animation.
  drawRipple(x, y) {
    let div = document.createElement('div');
    div.classList.add('ripple');
    this.appendChild(div);
    div.style.top = `${y - div.clientHeight/2}px`;
    div.style.left = `${x - div.clientWidth/2}px`;
    div.style.backgroundColor = 'currentColor';
    div.classList.add('run');
    div.addEventListener('transitionend', e => div.remove());
  }
}

customElements.define('fancy-button', FancyButton, {extends: 'button'});

//使用元素
//html标签
//<button is="fancy-button" disabled>Fancy button!</button>
//js创建
// Custom elements overload createElement() to support the is="" attribute.
let button = document.createElement('button', {is: 'fancy-button'});
button.textContent = 'Fancy button!';
button.disabled = true;
document.body.appendChild(button);
//或者
const FancyButton = customElements.get('fancy-button');
let button = new FancyButton();
button.textContent = 'Fancy button!';
button.disabled = true;
```
