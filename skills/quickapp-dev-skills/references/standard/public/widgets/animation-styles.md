# 动画样式

快应用支持开发者制作动画，提供了`transform`类、`animation`类与`transition`类的动画样式属性，且参数格式与 CSS 对齐，更方便开发者上手适配动画

`transform`可参考此[文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)入门

`animation`可参考此[文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation)入门

`transition` `1090+` 可参考此[文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition)入门

## 动画样式列表

| 名称                               | 类型                                                                                                                                                                                                                        | 默认值  | 描述                                                                                                     |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| transform-origin                   | `<position>`                                                                                                                                                                                                                | 0px 0px | 变换原点位置，单位目前仅支持 px，格式为：50px 100px                                                      |
| transform                          | `<string>`                                                                                                                                                                                                                  | -       | 见下面 transform 操作                                                                                    |
| animation-name                     | `<string>`                                                                                                                                                                                                                  | -       | 与@keyframes 的 name 相呼应，见下面@keyframes 属性                                                       |
| animation-delay                    | `<time>`                                                                                                                                                                                                                    | 0       | 目前支持的单位为[ s(秒) &#124; ms(毫秒) ]                                                                |
| animation-duration                 | `<time>`                                                                                                                                                                                                                    | 0       | 目前支持的单位为[ s(秒) &#124; ms(毫秒) ]                                                                |
| animation-iteration-count          | `<integer>` &#124; `infinite`                                                                                                                                                                                               | 1       | 定义动画播放的次数，可设置为`infinite`无限次播放                                                         |
| animation-timing-function          | linear &#124; ease &#124; ease-in &#124; ease-out &#124; ease-in-out &#124; cubic-bezier(`<number>`, `<number>`, `<number>`, `<number>`) &#124; step-start &#124; step-end &#124; steps(number_of_steps[, step-direction]?) | ease    | -                                                                                                        |
| animation-fill-mode                | none &#124; forwards                                                                                                                                                                                                        | none    | -                                                                                                        |
| animation-direction `1090+`        | normal &#124; reverse &#124; alternate &#124; alternate-reverse                                                                                                                                                             | normal  | 定义动画播放的方向，详情请看[文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-direction) |
| transition-property `1090+`        | `<string>`                                                                                                                                                                                                                  | all     | 指定执行 transition 效果的通用样式属性名称                                                               |
| transition-duration `1090+`        | `<time>`                                                                                                                                                                                                                    | 0s      | 指定 transition 执行时间                                                                                 |
| transition-timing-function `1090+` | linear &#124; ease &#124; ease-in &#124; ease-out &#124; ease-in-out &#124; cubic-bezier(`<number>`, `<number>`, `<number>`, `<number>`) &#124; step-start &#124; step-end &#124; steps(number_of_steps[, step-direction]?) | ease    | 指定 transition 执行时的时间函数。该参数释义与 animation 相同                                            |
| transition-delay `1090+`           | `<time>`                                                                                                                                                                                                                    | 0s      | 指定 transition 开始执行的时间，即当改变元素属性值后多长时间开始执行 transition 效果                     |

**注**：

- animation-timing-function 类型

cubic-bezier(`<number>`, `<number>`, `<number>`, `<number>`) | step-start | step-end | steps(number_of_steps[, step-direction]?) `1080+`后支持。其中：

steps(number_of_steps，step-direction) `1080+`

| 名称            | 类型                                                                                 | 默认值 | 必填 | 描述                           |
| --------------- | ------------------------------------------------------------------------------------ | ------ | ---- | ------------------------------ |
| number_of_steps | `<integer>`                                                                          | -      | 是   | 表示等间隔步数的正整数         |
| step-direction  | jump-start &#124; jump-end &#124; jump-none &#124; jump-both &#124; start &#124; end | end    | 否   | 指示函数左连续或右连续的关键字 |

- cubic-bezier(x1, y1, x2, y2) `1080+`

参数 x1, y1, x2, y2 是 `<number>` 类型的值，代表当前定义的立方贝塞尔曲线中的 P1 和 P2 点的横坐标和纵坐标，x1 和 x2 必须在 [0，1] 范围内，否则当前值无效。

## transform 操作

| 名称       | 类型                                |
| ---------- | ----------------------------------- |
| translate  | `<length>` &#124; `<percent> 1010+` |
| translateX | `<length>` &#124; `<percent> 1010+` |
| translateY | `<length>` &#124; `<percent> 1010+` |
| translateZ | `<length>` &#124; `<percent> 1200+` |
| scale      | `<number>`                          |
| scaleX     | `<number>`                          |
| scaleY     | `<number>`                          |
| rotate     | `<deg>` &#124; `<rad>`              |
| rotateX    | `<deg>` &#124; `<rad>`              |
| rotateY    | `<deg>` &#124; `<rad>`              |

## animation-name 属性

指定所采用的一系列动画，属性值的每个名称代表一个由 @keyframes 属性定义的关键帧序列。该属性支持在组件中应用单个动画或多个动画 `1070+` ，应用多个动画时动画同时开始执行。

示例代码：

```js
/* 单个动画 */
animation-name: Color;
animation-name: translate;
animation-name: rotate;

/* 多个动画 1070+ */
animation-name: Color, Opacity;
animation-name: Width, translate, rotate;
```

## @keyframes 属性

| 名称                        | 类型                                                                                           | 默认值  | 描述                                                                                            |
| --------------------------- | ---------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------- |
| background-color            | `<color>`                                                                                      | -       | -                                                                                               |
| background-position `1080+` | `<length>` &#124;`<percentage>`&#124; left &#124; right &#124; top &#124; bottom &#124; center | 0px 0px | 描述了背景图片在容器中绘制的位置，支持 1-4 个参数，详情见[背景图样式](background-img-styles.md) |
| opacity                     | `<number>`                                                                                     | -       | -                                                                                               |
| width/height                | `<length>`                                                                                     | -       | 暂不支持百分比                                                                                  |
| transform                   | `<string>`                                                                                     | -       | -                                                                                               |

**注**：

暂时不支持起始值(0%)或终止值(100%)缺省的情况，都需显式指定。

background-position 作为 @keyframes 属性 `1080+` 后支持。

## animation 动画事件 `1070+`

支持动画事件监听。

| 名称               | 参数           | 描述                   |
| ------------------ | -------------- | ---------------------- |
| animationstart     | AnimationEvent | 动画开始执行时的回调   |
| animationiteration | AnimationEvent | 动画重复开始执行时回调 |
| animationend       | AnimationEvent | 动画结束执行时的回调   |

AnimationEvent 对象说明:

| 属性          | 类型       | 描述                                                                    |
| ------------- | ---------- | ----------------------------------------------------------------------- |
| type          | `<String>` | 事件类型。可选值为 animationstart、animationiteration 和 animationend。 |
| animationName | `<String>` | 动画的名称。                                                            |
| elapsedTime   | `<float>`  | 事件发生时动画的执行时长。单位：秒                                      |

示例代码：

script 动态添加事件监听器

```js
var element = $element('id')
element.addEventListener('animationstart', event => {
  prompt.showToast({
    message:
      'type: ' +
      event.type +
      ', animationName: ' +
      event.animationName +
      ', elapsedTime: ' +
      event.elapsedTime
  })
})
element.addEventListener('animationend', event => {
  prompt.showToast({
    message:
      'type: ' +
      event.type +
      ', animationName: ' +
      event.animationName +
      ', elapsedTime: ' +
      event.elapsedTime
  })
})
element.addEventListener('animationiteration', event => {
  prompt.showToast({
    message:
      'type: ' +
      event.type +
      ', animationName: ' +
      event.animationName +
      ', elapsedTime: ' +
      event.elapsedTime
  })
})
```

## transition 过渡动画 `1090+`

transition 过渡动画是实现动画的另一种方式。过渡动画可以为元素定义在不同状态之间切换时的过渡效果，比如通过伪类或者 JavaScript 实现的状态变化。

### transition 使用示例

共 4 个样式属性：transition-property、transition-duration、transition-timing-function、transition-delay，直接写在样式当中，使用示例如下：

```css
.div {
  width: 100px;
  transition-property: width;
  transition-duration: 2s;
  transition-timing-function: ease-in;
  transition-delay: 0.5s;
}
.div:active {
  width: 300px;
}
```

上述 4 个样式属性可简写到一个中，表示当触发 div 的 width 变化后 0.5s，以加速的方式变化至新的 width 值，过渡动画持续 2s：

```css
.div {
  transition: width 2s ease-in 0.5s;
}
```

### transition-property 支持的通用样式属性

快应用中 transition-property 支持的通用样式属性列表如下：

|                      样式名称                       |                       备注                       |
| :-------------------------------------------------: | :----------------------------------------------: |
|                        width                        |                        √                         |
|                       height                        |                        √                         |
|                       opacity                       |                        √                         |
|                     visibility                      |                        √                         |
|                        color                        |                     暂不支持                     |
|                  transform-origin                   |                        √                         |
|                      transform                      |                        √                         |
|                       padding                       |                        √                         |
|   padding-[left&#124;top&#124;right&#124;bottom]    |                        √                         |
|                       margin                        |                        √                         |
|    margin-[left&#124;top&#124;right&#124;bottom]    |                        √                         |
|                       border                        |                     暂不支持                     |
|    border-[left&#124;top&#124;right&#124;bottom]    |                     暂不支持                     |
|                    border-width                     |                        √                         |
| border-[left&#124;top&#124;right&#124;bottom]-width |                        √                         |
|                    border-color                     |                        √                         |
| border-[left&#124;top&#124;right&#124;bottom]-color |                        √                         |
|                    border-radius                    |                     暂不支持                     |
|  border-[top&#124;bottom]-[left&#124;right]-radius  |                     暂不支持                     |
|                     background                      | 仅支持属性 background-color，background-position |
|                  background-color                   |                        √                         |
|                   background-size                   |                     暂不支持                     |
|                 background-position                 |                        √                         |
|                        flex                         |                        √                         |
|                      flex-grow                      |                        √                         |
|                     flex-shrink                     |                        √                         |
|                     flex-basis                      |                        √                         |
|       [left&#124;top&#124;right&#124;bottom]        |                        √                         |

注意：由于安卓与 Web 实现的区别，当 transition-property 指定的过渡样式属性（如 margin-[left&#124;top&#124;right&#124;bottom] 等）会引起页面布局变化时，部分组件的动画样式表现与 Web 存在差异，请开发者留意。

### transform &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/style/transform/index.ux)

### animation &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/style/animation/index.ux)

### translate 动画 &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/style/translatepercent/index.ux)
