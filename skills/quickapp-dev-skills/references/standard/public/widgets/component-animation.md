# 组件动画 `1080+`

## Element.animate()

这是一个创建新 `Animation` 的便捷方法，将它应用于元素，会返回一个新建的 `Animation` 对象实例；调用其 `play` 方法，即可执行动画，表现为一系列简单的变换 （位置、大小、旋转角度、背景颜色和不透明度）。

### 语法

```js
const element = this.$element('elementIdName')
const animation = element.animate(keyframes, options)
animation.play()
```

### 参数

#### keyframes 关键帧

代表关键帧的一个数组集合。目前支持的属性有：

| 名称               | 类型                                                                                           | 默认值    | 描述                                                                                            |
| ------------------ | ---------------------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------- |
| width              | `<number>`                                                                                     | -         | 动画执行后应用到组件上的宽度值。                                                                |
| height             | `<number>`                                                                                     | -         | 动画执行后应用到组件上的高度值。                                                                |
| backgroundColor    | `<color>`                                                                                      | -         | 动画执行后应用到组件上的背景颜色。                                                              |
| backgroundPosition | `<length>` &#124;`<percentage>`&#124; left &#124; right &#124; top &#124; bottom &#124; center | 0px 0px   | 描述了背景图片在容器中绘制的位置，支持 1-4 个参数，详情见[背景图样式](background-img-styles.md) |
| opacity            | `<number>`                                                                                     | 1         | 动画执行后应用到组件上的不透明度值介于 `0` 到 `1` 间的数值。                                    |
| transformOrigin    | `<String>`                                                                                     | '50% 50%' | 定义变化过程的中心点。<br> 第一个参数代表 x 轴，第二个参数代表 y 轴，单位 px 或百分比值；       |
| transform          | `<object>`                                                                                     | -         | 定义应用在元素上的变换类型，支持下表列出的属性。                                                |

如上 `transform` 参数说明如下：

| 参数名                          | 类型                          | 默认值 | 描述                   |
| ------------------------------- | ----------------------------- | ------ | ---------------------- |
| translate/translateX/translateY/translateZ | `<length>` &#124; `<percent>` | -      | 指定元素要移动到的位置，支持 translateZ 的版本 `1200+`|
| scale/scaleX/scaleY             | `<length>` &#124; `<percent>` | -      | 按比例放大或缩小元素   |
| rotate/rotateX/rotateY          | `<deg>` &#124; `<rad>`        | -      | 指定元素将被旋转的角度 |

```js
const keyframes = [
  {
    transform: '{scaleX:1, scaleY:1}',
    time: 0
  },
  {
    transform: '{scaleX:2, scaleY:2}',
    time: 100
  }
]
```

#### options 可选项

| 名称       | 类型                                                                                                                                  | 默认值                 | 描述                                                                                                                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id `1090+` | `<string>`                                                                                                                            | 从'0'开始自减的 string | 动画 id。为减小内存消耗，请开发者尽可能使用该字段复用动画。注：1. 复用动画后，被复用的前一个动画的 onfinish 等实例事件将被清除，不被触发； 2. 请勿使用从'0'开始自减的 string 作为 id，以免与引擎内部 id 重复。 |
| delay      | `<number>`                                                                                                                            | 0                      | 延迟动画开始的毫秒数。                                                                                                                                                                                         |
| duration   | `<number>`                                                                                                                            | 0                      | 每次迭代动画完成所需的毫秒数。如果此值为 0，则不会运行动画。                                                                                                                                                   |
| easing     | linear &#124; ease &#124; ease-in &#124; ease-out &#124; ease-in-out &#124; 自定义 cubic-bezier，例如`cubic-bezier(0.42, 0, 0.58, 1)` | linear                 | 动画的变化率，随着时间的推移而变化。                                                                                                                                                                           |
| fill       | "forwards" &#124; "backwards" &#124; "both" &#124; "none"                                                                             | "none"                 | 指示动画的效果是否应该在播放（`"backwards"`）之前由元素反映，在动画完成播放（`"forwards"`）之后保留，或者 `both`。                                                                                             |
| iterations | `<number>` &#124; `Infinity`                                                                                                          | 1                      | 动画重复的次数，如设为 `Infinity` 则无限重复                                                                                                                                                                   |

### 实例属性

| 属性      | 类型        | 描述                                                                           |
| --------- | ----------- | ------------------------------------------------------------------------------ |
| finished  | `<boolean>` | 只读属性，当前动画是否已完成。                                                 |
| playState | `<string>`  | 只读属性，获取动画的执行状态。                                                 |
| startTime | `<string>`  | 获取或设置动画播放开始的预定时间(单位 ms)，用途类似于 options 参数中的 delay。 |

如上 `playState` 具有如下几种状态：

- **idle**：动画当前的时间是无法解析的，并且队列里没有处于等待执行的任务；
- **running**：动画处于正在运行状态；
- **paused**：动画暂停；
- **finished**：动画已经达到某一临界点。

### 实例方法

| 方法    | 参数 | 描述             |
| ------- | ---- | ---------------- |
| play    | -    | 开始执行动画     |
| finish  | -    | 结束动画         |
| pause   | -    | 暂停动画         |
| cancel  | -    | 取消动画         |
| reverse | -    | 反转动画执行方向 |

### 实例事件

| 事件   | 描述         | 示例                                          |
| ------ | ------------ | --------------------------------------------- |
| cancel | 动画被取消   | animation.oncancel = () => { //do something } |
| finish | 动画执行结束 | animation.onfinish = () => { //do something } |

### 示例 Demo

```html
<template>
  <div class="page-wrapper">
    <input type="button" class="button" onclick="onCallAnimationClick" value="Animation 动画" />
    <text id="animation">{{ mTextState }}</text>
  </div>
</template>

<script>
let $animation = null
export default {
  private: {
    mTextState: 'Init'
  },

  onCallAnimationClick() {
    const keyframes = [
      {
        transform: {
          translateX: 0,
          translateY: 0
        },
        time: 0
      },
      {
        transform: {
          translateX: '100px',
          translateY: '100px'
        },
        time: 100
      }
    ]
    const options = {
      duration: 1000,
      easing: 'linear',
      delay: 0,
      fill: 'none',
      iterations: 5
    }
    const cAnimationNode = this.$element('animation')
    $animation = cAnimationNode.animate(keyframes, options)
    // 将会延迟至 (delay + startTime) ms 后执行动画；
    $animation.startTime = 1000

    $animation.play()
    this.mTextState = $animation.playState

    $animation.oncancel = () => {
      this.mTextState = $animation.playState
    }
    $animation.onfinish = () => {
      this.mTextState = $animation.playState
    }
  }
}
</script>

<style>
.page-wrapper {
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.button {
  color: #20a0ff;
  background-color: #ffffff;
  padding: 10px 20px;
  border: 1px solid #20a0ff;
  border-radius: 40px;
}
</style>
```
