# refresh-header `1090+`

## 概述

refresh2 下拉刷新顶部容器

## 子组件

支持

## 属性

| 名称                  | 类型        | 默认值 | 必填 | 描述                                                         |
| --------------------- | ----------- | ------ | ---- | ------------------------------------------------------------ |
| dragrate                | `<number>`  | 0.5  | 否   |  header 移动速度。<br> dragrate= header 移动距离  / 手势移动距离。                                   |
| triggerratio            | `<number>` | 0.7  | 否   | header 触发更新时的移动距离。<br> trigger距离 = triggerratio * header 的高度。<br> 优先级低于triggersize|
| triggersize            | `<number>` | 0  | 否   | header 触发更新时的移动距离值，大于 0 时生效。<br> 优先级高于 triggerratio。 <br> 单位：px        |
| maxdragratio                | `<number>`  | 1  | 否   | header 能够移动的最大距离。<br> 最大距离 maxdragratio * header 高度                                   |
| maxdragsize            | `<number>` | 0  | 否   | header 能够移动的最大距离。<br> 大于 0 时生效。<br> 优先级高于 maxdragratio <br> 单位：px    |                                     |
| refreshdisplayratio | `<number>` | 0.7   | 否   | header 正在刷新时的显示高度。<br> 显示高度 = refreshdisplayratio * header 高度 <br> header 默认为 0.7       |
| refreshdisplaysize                | `<number>`  | 0  | 否   | header 正在刷新时的显示高度，大于0时生效。<br> 优先级高于 refreshdisplayratio <br> 单位：px                                   |
| spinnerstyle            | `<String>` | translation  | 否   | header 的显示风格。<br> 支持如下 3 种类型：<br> translation：header 移动时，content 也会随着移动 <br> front：header 在 content 上面显示，content 不会随着 header 移动 <br> behind：header 在 content 的下面显示，content 不会随着 header 移动                                         |
| autorefresh            | `<boolean>` | false  | 否   | 滑动到顶部是否自动加载                                         |
| translationwithcontent | `<boolean>` | false   | 否   | header: 默认为 false ，在刷新时固定显示   |

## 事件

| 名称    | 参数                          | 描述                            |
| ------- | ----------------------------- | ------------------------------- |
| move | { scrollY:number,<br> percent:number,<br> isDrag:boolean,<br> refreshing:boolean} | header 移动时的参数回调。<br> scrollY: header 相对于初始位置的移动距离。header 在下拉的时候，scrollY 相对于初始位置为正数。<br> percent：header 移动的距离 / header触发更新距离。即当 percent >= 1f 时会触发刷新。<br> isDrag：是否手势拖动。<br> refreshing: 当前是否处理刷新状态（ 刷新状态下也可移动 ） |
