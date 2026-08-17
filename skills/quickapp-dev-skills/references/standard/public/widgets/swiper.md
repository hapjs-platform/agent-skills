# swiper

## 概述

滑块视图容器

## 子组件

支持

## 属性

支持[通用属性](common-attributes.md)

| 名称         | 类型        | 默认值 | 必填 | 描述                                      |
| ------------ | ----------- | ------ | ---- | ----------------------------------------- |
| index        | `<number>`  | ０     | 否   | 当前显示的子组件索引                      |
| autoplay     | `<boolean>` | false  | 否   | 渲染完成后，是否自动进行播放              |
| interval     | `<number>`  | 3000ms | 否   | 自动播放时的时间间隔，单位毫秒            |
| indicator    | `<boolean>` | true   | 否   | 是否启用 indicator，默认 true             |
| loop `1010+` | `<boolean>` | true   | 否   | 是否开启循环模式，`1030`及以下版本子组件数量大于 2 时才生效 |
| duration `1040+` | `<number>` | - | 否 | 滑动动画时长(duration默认根据手指的速度动态计算) |
| vertical  `1040+` | `<boolean>` | false | 否 | 滑动方向是否为纵向,纵向时indicator 也为纵向 |
| previousmargin  `1040+` | `<string>` | 0px | 否 | 前边距，可用于露出前一项的一小部分，支持单位：px和% |
| nextmargin  `1040+` | `<string>` | 0px | 否 | 后边距，可用于露出后一项的一小部分，支持单位：px和% |
| enableswipe `1080+` | `<boolean>` | true | 否 | 是否支持手势滑动swiper |
**备注**：`previousmargin`和`nextmargin`的总和不应该超过整个swiper大小的1/2，超过部分将会被截取。
## 样式

支持[通用样式](common-styles.md)

| 名称                     | 类型       | 默认值                         | 必填 | 描述                     |
| ------------------------ | ---------- | ------------------------------ | ---- | ------------------------ |
| indicator-color          | `<color>`  | rgba(0, 0, 0, 0.5)             | 否   | indicator 填充颜色       |
| indicator-selected-color | `<color>`  | #33b4ff 或者 rgb(51, 180, 255) | 否   | indicator 选中时的颜色   |
| indicator-size           | `<length>` | 20px                           | 否   | indicator 组件的直径大小 |
| indicator-[top&#124;left&#124;right&#124;bottom] `1040+`| `<length>` &#124; `<percentage>` | -   | 否 | indicator相对于swiper的位置 |
| page-animation-name `1080+`| `<string>` | - | 否 | swiper 过渡动画样式, 与动画样式中的 @keyframes 的 name 相呼应，但是不包括 @keyframes 中的 width/height 属性 |
| page-transform-origin `1080+`| `<position>` | 0px  0px | 否 | 变换原点位置，单位目前仅支持px，格式为：50px 100px |
| animation-timing-function `1080+`| linear &#124; ease &#124; ease-in &#124; ease-out &#124; ease-in-out &#124;  | ease | 否 | swiper 切换滑动动画类型 |

## 事件

支持[通用事件](common-events.md)

| 名称   | 参数                 | 描述                         |
| ------ | -------------------- | ---------------------------- |
| change | {index:currentIndex} | 当前显示的组件索引变化时触发 |

## 方法

| 名称    | 参数                      | 描述                     |
| ------- | ------------------------- | ------------------------ |
| swipeTo | {index: number(指定位置)} | swiper 滚动到 index 位置 |

## swiper &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/container/swiper/index.ux)
