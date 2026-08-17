# lottie `1100+`

## 概述

lottie 组件，是 airbnb 推出的一款高质量动画组件，通过引用`After Effects`的 Bodymovin 插件导出的 json 绘制动画，非常方便。开发者可在[官网](https://airbnb.design/lottie/)了解更多。

快应用引擎，从`1100`版本开始，提供 lottie 动画组件支持。开发者可配置 lottie 动画的 json 源文件，并通过引擎提供的 API 实现动画的播放、暂停等操作。

## 子组件

不支持

## 属性

| 名称       | 类型        | 默认值    | 必填 | 描述                                                                                                                        |
| ---------- | ----------- | --------- | ---- | --------------------------------------------------------------------------------------------------------------------------- |
| source     | `<uri>`     | 空        | 是   | lottie json 的源文件位置<br>支持本地 json（需统一放在`src/lottie`目录方可识别，使用相对路径）与远程 json（http/https 协议） |
| progress   | `<number>`  | 0         | 否   | 配置动画的播放进度，范围为 0~1（只能在播放前或者暂停后方可修改）                                                            |
| speed      | `<number>`  | 1         | 否   | 配置动画的播放倍速，默认速度为 1 倍，传入负数会倒放播放动画，传入 0 则不会播放                                              |
| loop       | `<boolean>` | true      | 否   | 配置动画是否循环播放                                                                                                        |
| autoplay   | `<boolean>` | false     | 否   | 配置动画是否自动播放                                                                                                        |
| rendermode | `<string>`  | AUTOMATIC | 否   | 配置动画的渲染加速模式，可选值有 `AUTOMATIC`（自动）、`HARDWARE`(硬件加速）、`SOFTWARE`（软件加速），一般情况下不需要配置   |

**注意**：

若需使用本地的 lottie 动画 json 文件，需要按照以下步骤：

1. 将 json 文件放置在快应用项目的`src/lottie`目录下

2. 编译或打包快应用项目时，使用 IDE >= `3.8` 版本，或 hap-toolkit >= `1.9.0` 版本，才可以支持打包本地的动画 json 文件进快应用的 RPK

## 样式

支持[通用样式](common-styles.md)

## 方法

| 名称   | 参数                                      | 描述                                                                                                                                                           |
| ------ | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| play   | {startFrame:value(帧),endFrame:value(帧)} | 播放动画。若默认从头到尾播放，调用 play 方法即可；<br>若需指定播放区间，则必须同时传入 `startFrame`（起始帧编号）和 `endFrame`（终止帧编号），且参数类型为整数 |
| pause  | -                                         | 暂停播放动画                                                                                                                                                   |
| reset  | -                                         | 立刻停止动画播放，且重置进度到动画的第 0 帧                                                                                                                    |
| resume | -                                         | 继续播放动画                                                                                                                                                   |

## 事件

| 名称     | 参数              | 描述                                                                             |
| -------- | ----------------- | -------------------------------------------------------------------------------- |
| change   | {progress: value} | 在动画正常播放过程中实时触发此回调，返回当前动画的播放进度`progress`，范围为 0~1 |
| error    | {error: value}    | 在动画播放出现异常时触发此回调，返回错误信息`error`                              |
| complete | -                 | 动画播放完毕后，触发此回调，仅在 lottie 组件的`loop`属性为`false`值时此回调生效  |

## 示例代码

可参考以下代码片段，或查看[官网示例](https://github.com/quickappcn/sample/blob/master/src/component/extend/lottie/index.ux)

```html
<template>
    <!-- 本地json需要放在项目下的src/lottie目录下 -->
    <lottie class="lottie" source="../lottie/lottie.json" id="lottie1" autoplay={{false}} loop={{false}}
        onerror="errorFunction" oncomplete="animationFinished" onchange="animationChanged"></lottie>
</template>
<script>
    import prompt from '@system.prompt'
    export default {
        playAnimation(startFrame, endFrame) {
            this.$element('lottie1').play({ startFrame, endFrame })
        },
        animationChanged(event) {
            this.onChangeProgress = event.progress
        },
        errorFunction(event) {
            prompt.showToast({
                message: 'lottie动画加载出错了：' + event.error
            })
        },
        animationFinished() {
            prompt.showToast({
                message: '动画播放完啦'
            })
        },
    }
</script>
```
