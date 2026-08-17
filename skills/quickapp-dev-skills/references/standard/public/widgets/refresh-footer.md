# refresh-footer `1090+`

## 概述

refresh2 下拉刷新底部容器

## 子组件

支持

## 属性

| 名称                  | 类型        | 默认值 | 必填 | 描述                                                         |
| --------------------- | ----------- | ------ | ---- | ------------------------------------------------------------ |
| dragrate                | `<number>`  | 0.5  | 否   |  footer 移动速度。<br> dragrate=( footer 移动距离 ) / 手势移动距离。                                   |
| triggerratio            | `<number>` | 0.7  | 否   | footer触发更新时的移动距离。<br> trigger 距离 = triggerratio * footer 高度。<br> 优先级比triggersize低                                         |
| triggersize | `<number>`  | 0   | 否   |footer 触发更新时的移动距离值，大于 0 时生效。<br> 优先级高于 triggerratio。<br> 单位：px                                     |
| maxdragratio                | `<number>`  | 1  | 否   | footer 能够移动的最大距离。<br> 最大距离 maxdragratio * footer 高度                                   |
| maxdragsize            | `<number>` | 0  | 否   | footer 能够移动的最大距离。<br> 大于 0 时生效。<br> 优先级高于 maxdragratio <br> 单位：px                                         |
| refreshdisplayratio | `<number>` | 0.7   | 否   | footer 正在刷新时的显示高度。<br> 显示高度 = refreshdisplayratio * footer 高度 <br> footer 默认为 1         |
| refreshdisplaysize                | `<number>`  | 0  | 否   | footer 正在刷新时的显示高度，大于 0 时生效。<br> 优先级高于 refreshdisplayratio <br> 单位：px                                   |
| spinnerstyle            | `<String>` | translation  | 否   | footer 的显示风格。<br> 支持如下 3 种类型：<br> translation：footer 移动时，content 也会随着移动 <br> front：footer 在 content 的上面显示，content 不会随着 footer 移动 <br> behind：footer 在 content 的下面显示，content 不会随着 footer 移动                                         |
| autorefresh            | `<boolean>` | false  | 否   | 滑动到底部是否自动加载                                         |
| translationwithcontent | `<boolean>` | false   | 否   | <br> footer: 默认为 true ，刷新时随着 content 部分移动    |

## 事件

| 名称    | 参数                          | 描述                            |
| ------- | ----------------------------- | ------------------------------- |
| move | {scrollY:number,<br> percent:number,<br> isDrag:boolean,<br> refreshing:boolean} | footer 移动时的参数回调。<br> scrollY: footer 相对于初始位置的移动距离。footer 在上拉的时候，scrollY相对于初始位置为负数。<br> percent：footer 移动的距离 / footer触发更新距离。即当 percent >= 1f 时会触发刷新。<br> isDrag：是否手势拖动。<br> refreshing: 当前是否处理刷新状态（ 刷新状态下也可移动 ） |
