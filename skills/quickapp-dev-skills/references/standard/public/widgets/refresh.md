# refresh

## 概述

下拉刷新容器

## 子组件

支持

## 属性

| 名称                  | 类型        | 默认值 | 必填 | 描述                                                         |
| --------------------- | ----------- | ------ | ---- | ------------------------------------------------------------ |
| offset                | `<length>`  | 132px  | 否   | 刷新组件静止时距离顶部距离                                   |
| refreshing            | `<boolean>` | false  | 否   | 刷新组件是否正在刷新                                         |
| type`1040+`           | `<String>`  | auto   | 否   | 两个可选值，不可动态修改<br>auto: 默认效果，列表界面拉到顶后，列表不移动，下拉后有转圈弹出。<br>pulldown: 列表界面拉到顶后，可以继续下拉一段，有回弹效果。 |
| enable-refresh`1080+` | `<boolean>` | true   | 否   | 是否允许刷新组件下拉刷新                                     |

## 样式

| 名称             | 类型      | 默认值 | 必填 | 描述                  |
| ---------------- | --------- | ------ | ---- | --------------------- |
| background-color | `<color>` | white  | 否   | 刷新组件背景颜色      |
| progress-color   | `<color>` | black  | 否   | 刷新组件 loading 颜色 |

## 事件

| 名称    | 参数                          | 描述                            |
| ------- | ----------------------------- | ------------------------------- |
| refresh | {refreshing: refreshingValue} | 下拉 refresh 组件，触发刷新操作 |

## refresh &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/container/refresh/index.ux)
