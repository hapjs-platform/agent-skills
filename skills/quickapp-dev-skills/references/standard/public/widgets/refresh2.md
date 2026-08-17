# refresh2 `1090+`

## 概述

下拉刷新增强容器

## 子组件

支持子组件、私有子组件 [`<refresh-header>`](refresh-header.md) 和 [`<refresh-footer>`](refresh-footer.md)

## 属性

| 名称                  | 类型        | 默认值 | 必填 | 描述                                                         |
| --------------------- | ----------- | ------ | ---- | ------------------------------------------------------------ |
| pulldownrefreshing    | `<boolean>`  | false  | 否   | 是否正在下拉刷新                                   |
| pulluprefreshing            | `<boolean>` | false  | 否   | 是否正在上拉刷新                                         |
| animationduration           | `<number>`  | 300ms   | 否   | header 或 footer 移动动画时长|
| enablepulldown | `<boolean>` | true   | 否   | 是否允许刷新组件下拉刷新                                     |
| enablepullup    | `<boolean>`  | false  | 否   | 是否允许刷新组件上拉刷新                                    |
| reboundable            | `<boolean>` | false  | 否   | 是否允许越界回弹                                       |
| gesture           | `<boolean>`  | true   | 否   | 是否允许手势滑动刷新 |
| offset | `<length>` | 132px   | 否   | 刷新组件静止时距离顶部距离，仅作用于header                                     |
| refreshing            | `<boolean>` | false  | 否   | 刷新组件是否正在刷新                                         |
| type           | `<String>`  | auto   | 否   | 两个可选值，不可动态修改<br>auto: 默认效果，列表界面拉到顶后，列表不移动，下拉后有转圈弹出。<br>pulldown: 列表界面拉到顶后，可以继续下拉一段，有回弹效果。 |

## 样式

| 名称             | 类型      | 默认值 | 必填 | 描述                  |
| ---------------- | --------- | ------ | ---- | --------------------- |
| background-color | `<color>` | white  | 否   | 刷新组件背景颜色      |
| progress-color   | `<color>` | black  | 否   | 刷新组件 loading 颜色 |

## 方法

| 名称    | 参数                      | 描述                     |
| ------- | ------------------------- | ------------------------ |
| startPullDownRefresh | 无 | 开始正在下拉刷新 |
| stopPullDownRefresh | 无 | 停止下拉刷新 |
| startPullUpRefresh | 无 | 开始正在上拉刷新 |
| stopPullUpRefresh | 无 | 停止上拉刷新 |

## 事件

| 名称    | 参数                          | 描述                            |
| ------- | ----------------------------- | ------------------------------- |
| pulldownrefresh | {refreshing: refreshingValue} | 下拉刷新触发 |
| pulluprefresh | {refreshing: refreshingValue} | 上拉刷新触发 |
| refresh | {refreshing: refreshingValue} | 下拉刷新触发，兼容 refresh 组件 |

## refresh2 &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/extend/refresh2/index.ux)